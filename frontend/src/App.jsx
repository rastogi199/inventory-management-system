import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">

        {/* Sidebar */}

        <div
          className="bg-dark text-white"
          style={{
            width: "260px",
            minHeight: "100vh",
          }}
        >
          <div className="p-4 border-bottom">
            <h3>Inventory Admin</h3>
          </div>

          <div className="p-3">

            <Link
              to="/"
              className="nav-link text-white mb-3"
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </Link>

            <Link
              to="/products"
              className="nav-link text-white mb-3"
            >
              <FaBox className="me-2" />
              Products
            </Link>

            <Link
              to="/customers"
              className="nav-link text-white mb-3"
            >
              <FaUsers className="me-2" />
              Customers
            </Link>

            <Link
              to="/orders"
              className="nav-link text-white"
            >
              <FaShoppingCart className="me-2" />
              Orders
            </Link>

          </div>
        </div>

        {/* Main Content */}

        <div
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "#f4f6f9",
            minHeight: "100vh",
          }}
        >

          {/* Header */}

          <div className="bg-white rounded shadow-sm p-3 mb-4">
            <h4 className="mb-0">
              Inventory Management System
            </h4>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;