# 🚀 Inventory Management System

A full-stack Inventory Management System built using **FastAPI**, **React (Vite)**, **PostgreSQL**, and **SQLAlchemy**.

The application allows administrators to manage products, customers, orders, and inventory stock through a modern dashboard interface.

---

## 🌐 Live Demo

### Frontend (Vercel)

https://inventory-management-system-azure-seven.vercel.app

### Backend API (Render)

https://inventory-backend-le5h.onrender.com

### Swagger Documentation

https://inventory-backend-le5h.onrender.com/docs

### GitHub Repository

https://github.com/rastogi199/inventory-management-system

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Bootstrap 5
* Axios
* React Router DOM

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

### Database

* PostgreSQL (Render)

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Render PostgreSQL

---

## ✨ Features

### Dashboard

* Total Products
* Total Customers
* Total Orders
* Low Stock Products

### Product Management

* Add Product
* View Products
* Delete Product
* SKU Validation
* Stock Quantity Tracking

### Customer Management

* Add Customer
* View Customers
* Delete Customer
* Email Validation

### Order Management

* Create Orders
* Delete Orders
* Customer Selection
* Product Selection
* Automatic Total Calculation
* Stock Deduction on Order Creation

### User Experience

* Responsive Admin Dashboard
* Sidebar Navigation
* Loading Indicators
* Real-time Data Updates

---

## 📂 Project Structure

```text
inventory-system/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/rastogi199/inventory-management-system.git
cd inventory-management-system
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

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

## 📸 Application Modules

### Dashboard

Displays inventory analytics and key business metrics.

### Products

Manage inventory products with SKU validation.

### Customers

Manage customer records with email validation.

### Orders

Create and manage orders with automatic stock updates.

---

## 🚀 Deployment

### Backend

* Render Web Service
* PostgreSQL Database on Render

### Frontend

* Vercel Deployment

---

## 👨‍💻 Author

**Chirag Rastogi**

GitHub:
https://github.com/rastogi199

---

## 📄 License

This project is created for educational and technical assessment purposes.
