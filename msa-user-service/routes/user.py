from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session

from schema.user import User, UserBase, UserList, Token, UserLogin
from service.auth import userlogin
from service.database import get_db
from service.user import register, userlist, userone

router = APIRouter()

@router.post('/user', response_model=User) # 넘어오는 응답 형식 User >
async def new_user(user: UserBase, db:session=Depends(get_db)):
    print(user)

    return register(db, user)

@router.get('/users', response_model=list[UserList]) # 넘어오는 응답 형식 User >
async def list_users(db:session=Depends(get_db)):
    users = userlist(db)

    # 테이블 조회한 결과 객체를
    # UserList 형식의 배열로 재생성
    # return [UserList.from_orm(u) for u in users]      # 예전버전
    return [UserList.model_validate(u) for u in users]  # 최신버전

@router.get('/user/{mno}', response_model=Optional[User])
async def user_one(mno: int, db:session=Depends(get_db)):
    user = userone(db,mno)

    # 데이터가 없을 경우 404 예외처리
    if user is None:
        raise HTTPException(404, 'User not found')

    return User.model_validate(user)

@router.post('/userlogin', response_model=Optional[Token])
async def user_login(login: UserLogin, db:session=Depends(get_db)):
    token = userlogin(login, db)
    print(token)

    if token is None:
        raise HTTPException(401, '로그인 실패! - 아이디 혹은 비밀번호가 다릅니다!')

    return token