from fastapi import APIRouter, Depends
from sqlalchemy.orm import session

from schema.user import User, UserBase
from service.database import get_db
from service.user import register

router = APIRouter()

@router.post('/user', response_model=User) # 넘어오는 응답 형식 User >
async def new_user(user: UserBase, db:session=Depends(get_db)):
    print(user)

    return register(db, user)