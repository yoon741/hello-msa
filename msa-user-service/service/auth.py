from datetime import timedelta, datetime
from typing import Optional

import bcrypt
import jwt  # PyJWT

from sqlalchemy.orm import Session

from models.user import User
from schema.user import UserLogin, Token


# JWT 로그인 처리
def userlogin(login: UserLogin, db: Session):
    loginuser = db.query(User).filter(User.userid == login.userid).first() # first : 첫번째로 일치하는 레코드 반환
                                                                               # 만약 일치하는 값이 없다면 None으로 반환
    if loginuser is None:   # 아이디가 일치하지 않으면
        token = None                            # 이 두가지 or로 합칠 수 있음
    elif not bcrypt.checkpw(    # 비밀번호가 일치하지 않으면
            login.passwd.encode('utf-8'), loginuser.passwd):
        token = None
    else:
        # token = "{'access_token': 'hello, world', 'token_type': 'bearer'}"  # bearer : 토큰 타입 (보통 bearer을 많이 사용)
                                                        # 로그인 성공 시 반환할 토큰을 생성하는 코드(현재는 임시코드)
        # token = Token(access_token='hello', token_type='bearer')
        access_token = generate_access_token(login.userid)
        token = Token(access_token=access_token, token_type='bearer')

    return token

# 비밀번호 암호화
# bcrypt : 비밀번호 단방향 암호화에 자주 사용하는 패키지
# 암호화 방법 : 사용자의 비밀번호 + bcrypt의 고유한 salt솔트
def hashed_password(passwd):
    SALT= bcrypt.gensalt() # salt솔트 생성
    hashed_password = bcrypt.hashpw(passwd.encode('utf-8'), SALT)
    print(hashed_password)

    return hashed_password

# JWT 엑세스 토큰 생성 (jwt.io 공식사이트)
# pip install PyJWT 로 설치
# 액세스 토큰 = 헤더 + 페이로드 + 시그니처
# 페이로드 : JWT의 중요한 구성 요소 - 토큰에 저장한 사용자 정보 및 클레임 포함
# 등록된 클레임 : iss(발급주체), sub(토큰주체), aud(사용가능대상 -url),
#                   exp(유효기간), iat(발행시간), jti(토큰 고유식별자)
# expire_delta : 토큰 유지 기간 (기본 30분)
def generate_access_token(userid: str, expire_delta: Optional[timedelta] = None):

    # 토큰 생성 시 사용할 비밀키
    SECRETKEY = 'Hello, World!! 13579'


    # 토큰 유효기간 설정
    if expire_delta:
        expire = datetime.now() + expire_delta
    else:
        expire = datetime.now() + timedelta(minutes=30)

    # 토큰 발급
    to_encode = {'iss': 'http://127.0.0.1:3000' ,'sub': userid,
                 'exp': expire, 'aud': 'http://127.0.0.1:3000'}    # jwt 페이로드
    encode_jwt = jwt.encode(to_encode, SECRETKEY, algorithm='HS256')

    return encode_jwt