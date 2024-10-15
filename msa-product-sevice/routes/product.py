from fastapi import APIRouter, Depends
from sqlalchemy.orm import session

from schema.product import Product, ProductBase
from service.database import get_db
from service.product import register

router = APIRouter()

@router.post('/product', response_model=Product)
async def new_product(product: ProductBase, db:session=Depends(get_db)):
    print(product)

    return register(db, product)