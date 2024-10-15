from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    desc: str
    price: int
    maker: str
    regdate: str


class Product(ProductBase):
    pno: int

    # ORM 맵핑을 위한 설정
    # 데이터베이스 테이블 각 행 <-> pydantic
    class Config:
        from_attribute=True