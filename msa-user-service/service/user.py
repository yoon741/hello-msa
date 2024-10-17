from sqlalchemy.orm import Session

from models.user import User
from schema.user import UserBase
from service.auth import hashed_password


# 회원 가입 처리
# 기본 회원정보 + 번호, 가입일이 자동으로 추가되어 넘어옴
def register(db: Session, user: UserBase): # User라는 형식으로 route로 넘김
    # 비밀번호 암호화
    hashed_passwdd = hashed_password(user.passwd)

    user = User(**user.model_dump())  # 데이터를 형식에 맞게 제대로 넘어왔는지 유효성검사
    user.passwd = hashed_passwdd  # 기존 비밀번호 교체
    db.add(user)
    db.commit()
    db.refresh(user)  # 메모리상 데어터베이스에도 반영
    print(user)

    return user


# 회원 목록 조회
def userlist(db: Session):
    return db.query(User.mno, User.userid, User.name, User.regdate).all()
                                                # 조건에 맞는 결과 몽땅 보이게 할때 all()
# 회원 상세 조회
def userone(db: Session, mno: int):
    return db.query(User).filter(User.mno == mno).first()  # 조건에 맞는 결과 하나만 보이게 할때 first()