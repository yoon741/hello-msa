from pydantic import BaseModel


class UserBase(BaseModel):
    userid: str
    passwd: str
    name: str
    email: str

class User(UserBase):
    mno: int
    regdate: str

    # ORM 맵핑을 위한 설정
    # 데이터베이스 테이블 각 행 <-> pydantic
    class Config:
        from_attributes=True

class UserList(BaseModel):
    userid: str
    name: str
    mno: int
    regdate: str

    class Config:
        from_attributes=True    # ORM으로 넘어온 데이터를
                                # pydantic형식으로 쉽게 변환 (pydantic형식 = json형식)