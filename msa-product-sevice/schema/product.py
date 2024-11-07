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
        from_attributes=True

class ProductList(BaseModel):
    pno: int
    name: str
    price: int
    regdate: str

    class Config:
        from_attributes=True  # from_attributes  < s 필수