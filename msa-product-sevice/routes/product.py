from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Product(BaseModel):
    name: str
    desc: str
    price: str
    maker: str
    regdate: str

@router.post('/product')
async def new_product(product: Product):    # 클래스는 첫글자 대문자로
    print(product)

    return {'msg': 'ok'}