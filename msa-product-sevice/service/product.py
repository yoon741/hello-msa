from sqlalchemy.orm import Session

from models.product import Product
from schema.product import ProductBase


# 상품 등록 처리
# 기본 상품정보 + 번호, 등록일이 자동으로 추가 후 넘어옴
def register(db: Session, product: ProductBase): # Product라는 형식으로 route로 넘김
    product = Product(**product.model_dump())  # 데이터를 형식에 맞게 제대로 넘어왔는지 유효성검사
    db.add(product)
    db.commit()
    db.refresh(product)  # 메모리상 데어터베이스에도 반영
    print(product)

    return product

# 상품 목록 조회
def productlist(db: Session):
    return db.query(Product.pno, Product.name, Product.price, Product.regdate)\
                                                    .order_by(Product.pno.desc()).all()