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

# 상품 상세 조회
def productone(db: Session, pno: int):
    return db.query(Product).filter(Product.pno == pno).first()

# 상품 상세 삭제
def productdelete(db: Session, pno: int):
    # 삭제할 상품 조회 >
    product = db.query(Product).filter(Product.pno == pno).first()

    if product: # 삭제할 상품이 존재한다면
        db.delete(product)  # 받아온 대상을 삭제
        db.commit()         # 삭제한 것을 적용
    else:  # 만약삭제하지 못했다면 return
        return None

    # 삭제한 상품수를 직접 return 함
    # 만일, 프로그래밍으로 삭제한 상품수를 return하려면 core orm을 이용하라 것! (db.execute(delete~))
    return 1

# 상품 상세 수정
def productupdate(db: Session, product: Product):
    # 수정할 상품 조회
    productone = db.query(Product).filter(Product.pno == product.pno).first()
        # 이름이 동일하기 때문에 one을 붙임

    if productone: # 수정할 상품이 존재한다면
        # productone.name = product.name
        # productone.desc = product.desc
        # productone.price = product.price
        # productone.maker = product.maker
        # productone.regdate = product.regdate  # 이렇게 하드코딩을 작성하기 보다 반복문 사용하여 짧게 작성가능

        # setattr(대상, 키, 값) : 실행중에 특정 객체의 키를 기준으로 값을 수정함
        # 많은 속성을 반복적으로 처리할때 주로 사용
        for key, val in product.__dict__.items():
            if key != 'pno' and val is not None:  # pno는 수정에서 제외
                setattr(productone, key, val)
        db.commit()# 수정한 것을 적용

    else:  # 만약수정하지 못했다면 return
        return None

    # 수정한 상품수를 직접 return 함
    return 1
