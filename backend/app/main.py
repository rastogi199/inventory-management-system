from fastapi import FastAPI
from fastapi import Depends

from sqlalchemy.orm import Session

from .database import Base
from .database import engine

from .dependencies import get_db

from . import crud
from . import schemas

from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware



Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Inventory System Running"
    }


# @app.post("/products")
# def create_product(
#     product: schemas.ProductCreate,
#     db: Session = Depends(get_db)
# ):

#     return crud.create_product(
#         db,
#         product
#     )

@app.post("/products")
def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(get_db)
):

    created_product = crud.create_product(
        db,
        product
    )

    if created_product is None:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    return created_product

@app.get("/products")
def get_products(
    db: Session = Depends(get_db)
):
    return crud.get_products(db)


@app.get("/products/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = crud.get_product(
        db,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product

@app.put("/products/{product_id}")
def update_product(
    product_id: int,
    product: schemas.ProductUpdate,
    db: Session = Depends(get_db)
):

    updated_product = crud.update_product(
        db,
        product_id,
        product
    )

    if not updated_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if updated_product == "SKU_EXISTS":
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    return updated_product

@app.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    deleted_product = crud.delete_product(
        db,
        product_id
    )

    if not deleted_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return deleted_product

@app.post("/customers")
def create_customer(
    customer: schemas.CustomerCreate,
    db: Session = Depends(get_db)
):

    created_customer = crud.create_customer(
        db,
        customer
    )

    if not created_customer:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return created_customer



@app.get("/customers")
def get_customers(
    db: Session = Depends(get_db)
):

    return crud.get_customers(db)

@app.get("/customers/{customer_id}")
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = crud.get_customer(
        db,
        customer_id
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


@app.delete("/customers/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    deleted_customer = crud.delete_customer(
        db,
        customer_id
    )

    if not deleted_customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return deleted_customer


@app.put("/customers/{customer_id}")
def update_customer(
    customer_id: int,
    customer: schemas.CustomerUpdate,
    db: Session = Depends(get_db)
):

    updated_customer = crud.update_customer(
        db,
        customer_id,
        customer
    )

    if not updated_customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    if updated_customer == "EMAIL_EXISTS":
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return updated_customer

@app.post("/orders")
def create_order(
    order: schemas.OrderCreate,
    db: Session = Depends(get_db)
):

    created_order = crud.create_order(
        db,
        order
    )

    if isinstance(created_order, dict):

        raise HTTPException(
            status_code=400,
            detail=created_order["error"]
        )

    return created_order

@app.get("/orders")
def get_orders(
    db: Session = Depends(get_db)
):

    return crud.get_orders(db)

@app.get("/orders/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = crud.get_order(
        db,
        order_id
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order

@app.delete("/orders/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    deleted_order = crud.delete_order(
        db,
        order_id
    )

    if not deleted_order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return deleted_order

@app.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    return crud.get_dashboard_stats(db)