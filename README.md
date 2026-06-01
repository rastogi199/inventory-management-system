# Inventory Management System

A full-stack Inventory Management System built using FastAPI, SQLAlchemy, React, Axios, Bootstrap, and SQLite.

This application allows administrators to manage products, customers, and orders while automatically tracking inventory stock levels.

---

# Features

## Dashboard

- Total Products Count
- Total Customers Count
- Total Orders Count
- Low Stock Products Count
- Dynamic Dashboard Statistics

---

## Product Management

- Create Product
- View Product List
- Update Product
- Delete Product
- SKU Validation (Unique SKU)
- Quantity Validation
- Price Management

---

## Customer Management

- Create Customer
- View Customer List
- Delete Customer
- Email Validation
- Duplicate Email Prevention

---

## Order Management

- Create Order
- View Orders
- Delete Order
- Customer Selection
- Product Selection
- Quantity Selection
- Automatic Total Amount Calculation

---

## Inventory Features

- Automatic Stock Deduction
- Insufficient Stock Validation
- Low Stock Monitoring
- Real-Time Dashboard Updates

---

# Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- SQLite

## Frontend

- React
- Axios
- React Router DOM
- Bootstrap 5

## Tools

- Git
- GitHub
- Docker

---

# Project Structure

```text
inventory-system/
│
├── backend/
│   ├── app/
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

# API Endpoints

## Products

| Method | Endpoint |
|----------|----------|
| POST | /products |
| GET | /products |
| GET | /products/{id} |
| PUT | /products/{id} |
| DELETE | /products/{id} |

---

## Customers

| Method | Endpoint |
|----------|----------|
| POST | /customers |
| GET | /customers |
| GET | /customers/{id} |
| DELETE | /customers/{id} |

---

## Orders

| Method | Endpoint |
|----------|----------|
| POST | /orders |
| GET | /orders |
| GET | /orders/{id} |
| DELETE | /orders/{id} |

---

## Dashboard

| Method | Endpoint |
|----------|----------|
| GET | /dashboard |

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Docker Setup

## Build Containers

```bash
docker compose build
```

## Run Containers

```bash
docker compose up
```

## Stop Containers

```bash
docker compose down
```

---

# Business Logic

## Product Validation

- SKU must be unique
- Quantity cannot be negative

## Customer Validation

- Email format validation
- Duplicate emails not allowed

## Order Validation

- Customer must exist
- Product must exist
- Quantity must be greater than zero
- Stock must be available

## Inventory Update

When an order is created:

1. Product stock is checked
2. Total amount is calculated
3. Product quantity is reduced
4. Order is stored in database

---

# Future Improvements

- PostgreSQL Integration
- Authentication & Authorization
- JWT Security
- Order Update Feature
- Product Search & Filtering
- Pagination
- Deployment on Render/Railway/AWS
- Dockerized PostgreSQL

---

# Author

Chirag Rastogi

GitHub:
https://github.com/rastogi199

---

# Project Status

Completed

- Backend API Development
- Frontend Development
- CRUD Operations
- Dashboard Integration
- Order Processing
- Inventory Tracking
- Validations
- Docker Configuration
- GitHub Integration