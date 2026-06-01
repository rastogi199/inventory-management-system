from sqlalchemy.orm import Session
from .models import Product
from .models import Customer
from .models import Order
from sqlalchemy import func


# def create_product(db: Session, product):

#     db_product = Product(
#         name=product.name,
#         sku=product.sku,
#         price=product.price,
#         quantity=product.quantity
#     )

#     db.add(db_product)

#     db.commit()

#     db.refresh(db_product)

#     return db_product

def create_product(db: Session, product):

    existing_product = db.query(Product).filter(
        Product.sku == product.sku
    ).first()

    if existing_product:
        return None

    db_product = Product(
        name=product.name,
        sku=product.sku,
        price=product.price,
        quantity=product.quantity
    )

    db.add(db_product)

    db.commit()

    db.refresh(db_product)

    return db_product

def get_products(db):
    return db.query(Product).all()

def get_product(db, product_id):

    return db.query(Product).filter(
        Product.id == product_id
    ).first()

def update_product(
    db,
    product_id,
    product
):

    db_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not db_product:
        return None

    existing_sku = db.query(Product).filter(
        Product.sku == product.sku,
        Product.id != product_id
    ).first()

    if existing_sku:
        return "SKU_EXISTS"

    db_product.name = product.name
    db_product.sku = product.sku
    db_product.price = product.price
    db_product.quantity = product.quantity

    db.commit()

    db.refresh(db_product)

    return db_product

def delete_product(
    db,
    product_id
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        return None

    db.delete(product)

    db.commit()

    return {
        "message": "Product Deleted Successfully"
    }

def create_customer(
    db,
    customer
):

    existing_customer = db.query(Customer).filter(
        Customer.email == customer.email
    ).first()

    if existing_customer:
        return None

    db_customer = Customer(
        full_name=customer.full_name,
        email=customer.email,
        phone=customer.phone
    )

    db.add(db_customer)

    db.commit()

    db.refresh(db_customer)

    return db_customer

def get_customers(db):

    return db.query(Customer).all()

def get_customer(
    db,
    customer_id
):

    return db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

def delete_customer(
    db,
    customer_id
):

    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        return None

    db.delete(customer)

    db.commit()

    return {
        "message": "Customer Deleted"
    }

def update_customer(
    db,
    customer_id,
    customer
):

    db_customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not db_customer:
        return None

    existing_email = db.query(Customer).filter(
        Customer.email == customer.email,
        Customer.id != customer_id
    ).first()

    if existing_email:
        return "EMAIL_EXISTS"

    db_customer.full_name = customer.full_name
    db_customer.email = customer.email
    db_customer.phone = customer.phone

    db.commit()

    db.refresh(db_customer)

    return db_customer

def create_order(
    db,
    order
):

    customer = db.query(Customer).filter(
        Customer.id == order.customer_id
    ).first()

    if not customer:
        return {
            "error": "Customer not found"
        }

    product = db.query(Product).filter(
        Product.id == order.product_id
    ).first()

    if not product:
        return {
            "error": "Product not found"
        }

    if product.quantity < order.quantity:
        return {
            "error": "Insufficient stock"
        }

    total_amount = (
        product.price * order.quantity
    )

    product.quantity -= order.quantity

    # db_order = Order(
    #     customer_id=order.customer_id,
    #     quantity=order.quantity,
    #     total_amount=total_amount
    # )
    db_order = Order(
        customer_id=order.customer_id,
        product_id=order.product_id,
        quantity=order.quantity,
        total_amount=total_amount
    )

    db.add(db_order)

    db.commit()

    db.refresh(db_order)

    return db_order

def get_orders(db):

    return db.query(Order).all()

def get_order(
    db,
    order_id
):

    return db.query(Order).filter(
        Order.id == order_id
    ).first()

def delete_order(
    db,
    order_id
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        return None

    db.delete(order)

    db.commit()

    return {
        "message": "Order Deleted"
    }

def get_dashboard_stats(db):

    total_products = db.query(Product).count()

    total_customers = db.query(Customer).count()

    total_orders = db.query(Order).count()

    low_stock_products = db.query(Product).filter(
        Product.quantity < 5
    ).count()

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "low_stock_products": low_stock_products
    }   