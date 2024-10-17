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