from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schema.product import Product, ProductBase, ProductList
from service.database import get_db
from service.product import register, productlist, productone

router = APIRouter()

@router.post('/product', response_model=Product)
async def new_product(product: ProductBase, db:Session=Depends(get_db)):
    print(product)

    return register(db, product)

@router.get('/products', response_model=list[ProductList])
async def list_products(db:Session=Depends(get_db)):
    products = productlist(db)

    return [ProductList.model_validate(p) for p in products]

@router.get('/product/{pno}', response_model=Optional[Product])
async def product_one(pno:int, db:Session=Depends(get_db)):
    product = productone(db,pno)

    # 상품이 조회되지 않을 경우 응답코드 404를 프론트엔드로 전달
    # 데이터가 존재하지 않는다면 오류가 아니므로 500번이 아닌 다른 예외처리를 줌
    if product is None:
        raise HTTPException(404, 'Product not found')

    return Product.model_validate(product)