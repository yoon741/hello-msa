import bcrypt
from sqlalchemy.orm import Session

from models.user import User
from schema.user import UserLogin, Token


# JWT 로그인 처리
def userlogin(login: UserLogin, db: Session):
    loginuser = db.query(User).filter(User.userid == login.userid,
                                      User.passwd == login.passwd).first() # first : 첫번째로 일치하는 레코드 반환
    print(loginuser)                                                               # 만약 일치하는 값이 없다면 None으로 반환

    if loginuser is None:
        token = None
    else:
        # token = "{'access_token': 'hello, world', 'token_type': 'bearer'}"  # bearer : 토큰 타입 (보통 bearer을 많이 사용)
                                                        # 로그인 성공 시 반환할 토큰을 생성하는 코드(현재는 임시코드)
        token = Token(access_token='hello', token_type='bearer')

    return token

# 비밀번호 암호화
# bcrypt : 비밀번호 단방향 암호화에 자주 사용하는 패키지
# 암호화 방법 : 사용자의 비밀번호 + bcrypt의 고유한 salt솔트
def hashed_password(passwd):
    SALT= bcrypt.gensalt() # salt솔트 생성
    hashed_password = bcrypt.hashpw(passwd.encode('utf-8'), SALT)
    print(hashed_password)

    return hashed_password