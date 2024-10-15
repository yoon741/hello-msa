from sqlalchemy import select
from sqlalchemy.orm import Session

from models.user import User
from schema.user import UserBase


# 회원 가입 처리
# 기본 회원정보 + 번호, 가입일이 자동으로 추가되어 넘어옴
def register(db: Session, user: UserBase): # User라는 형식으로 route로 넘김
    user = User(**user.model_dump())  # 데이터를 형식에 맞게 제대로 넘어왔는지 유효성검사
    db.add(user)
    db.commit()
    db.refresh(user)  # 메모리상 데어터베이스에도 반영
    print(user)

    return user


# 회원 목록 조회
def userlist(db: Session):
    return db.query(User.mno, User.userid, User.name, User.regdate).all()