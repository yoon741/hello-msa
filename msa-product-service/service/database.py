import sqlalchemy
from sqlalchemy.orm import sessionmaker
from models.product import Base

db_url = 'sqlite:///product.db'

engine = sqlalchemy.create_engine(db_url, echo=True)
SessionLocal = sessionmaker(autocommit=False,
                    autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(engine)

def get_db():
    with SessionLocal() as db:
        yield db
