# 🚀 Inventory Management System

A full-stack Inventory Management System built using **FastAPI**, **React (Vite)**, **PostgreSQL**, and **SQLAlchemy**. The application provides a centralized platform to manage products, customers, orders, and inventory stock with a clean and responsive admin dashboard.

---

## 🌐 Live Demo

### Frontend (Vercel)

https://inventory-management-system-azure-seven.vercel.app

### Backend API (Render)

https://inventory-backend-le5h.onrender.com

### API Documentation (Swagger UI)

https://inventory-backend-le5h.onrender.com/docs

### GitHub Repository

https://github.com/rastogi199/inventory-management-system

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Bootstrap 5
* Axios
* React Router DOM

### Backend

* FastAPI
* SQLAlchemy ORM
* Pydantic
* Uvicorn

### Database

* PostgreSQL (Render)

### DevOps & Deployment

* Docker
* Docker Compose
* Render
* Vercel

---

## ✨ Features

### Dashboard

* View total products
* View total customers
* View total orders
* Monitor low-stock products

### Product Management

* Add new products
* View product inventory
* Delete products
* SKU validation
* Stock quantity tracking

### Customer Management

* Add customers
* View customer records
* Delete customers
* Email validation

### Order Management

* Create orders
* Delete orders
* Select customer and product
* Automatic total amount calculation
* Automatic stock deduction after order creation

### User Experience

* Responsive admin dashboard
* Sidebar navigation
* Loading indicators
* Real-time data updates

---

## 📂 Project Structure

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
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/rastogi199/inventory-management-system.git
cd inventory-management-system
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

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

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend

```env
DATABASE_URL=postgresql://username:password@host:5432/database
```

### Frontend

```env
VITE_API_URL=https://inventory-backend-le5h.onrender.com
```

---

## 🐳 Docker Setup

### Build and Run with Docker Compose

```bash
docker compose up --build
```

### Backend Docker Build

```bash
docker build -t inventory-backend ./backend
```

### Frontend Docker Build

```bash
docker build -t inventory-frontend ./frontend
```

---

## 🚀 Deployment

### Backend Deployment

* Render Web Service
* Docker Container
* PostgreSQL Database (Render)

### Frontend Deployment

* Vercel

### Production URLs

Frontend:
https://inventory-management-system-azure-seven.vercel.app

Backend:
https://inventory-backend-le5h.onrender.com

Swagger:
https://inventory-backend-le5h.onrender.com/docs

---

## 📸 Core Modules

### Dashboard

Displays inventory analytics and key business metrics.

### Products

Manage inventory products with SKU validation and stock tracking.

### Customers

Manage customer records with email validation.

### Orders

Create and manage orders with automatic stock updates and total calculations.

---

## 👨‍💻 Author

**Chirag Rastogi**

GitHub:
https://github.com/rastogi199

---

## 📄 License

This project was developed for educational purposes and technical assessment evaluation.
