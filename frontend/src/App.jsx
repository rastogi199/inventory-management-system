// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// import {
//   FaTachometerAlt,
//   FaBox,
//   FaUsers,
//   FaShoppingCart,
// } from "react-icons/fa";

// import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
// import Customers from "./pages/Customers";
// import Orders from "./pages/Orders";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="d-flex">

//         {/* Sidebar */}

//         <div
//           className="bg-dark text-white"
//           style={{
//             width: "260px",
//             minHeight: "100vh",
//           }}
//         >
//           <div className="p-4 border-bottom">
//             <h3>Inventory Admin</h3>
//           </div>

//           <div className="p-3">

//             <Link
//               to="/"
//               className="nav-link text-white mb-3"
//             >
//               <FaTachometerAlt className="me-2" />
//               Dashboard
//             </Link>

//             <Link
//               to="/products"
//               className="nav-link text-white mb-3"
//             >
//               <FaBox className="me-2" />
//               Products
//             </Link>

//             <Link
//               to="/customers"
//               className="nav-link text-white mb-3"
//             >
//               <FaUsers className="me-2" />
//               Customers
//             </Link>

//             <Link
//               to="/orders"
//               className="nav-link text-white"
//             >
//               <FaShoppingCart className="me-2" />
//               Orders
//             </Link>

//           </div>
//         </div>

//         {/* Main Content */}

//         <div
//           className="flex-grow-1 p-4"
//           style={{
//             backgroundColor: "#f4f6f9",
//             minHeight: "100vh",
//           }}
//         >

//           {/* Header */}

//           <div className="bg-white rounded shadow-sm p-3 mb-4">
//             <h4 className="mb-0">
//               Inventory Management System
//             </h4>
//           </div>

//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/customers" element={<Customers />} />
//             <Route path="/orders" element={<Orders />} />
//           </Routes>

//         </div>

//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/");

  const menuItems = [
    { path: "/", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/products", name: "Products", icon: <FaBox /> },
    { path: "/customers", name: "Customers", icon: <FaUsers /> },
    { path: "/orders", name: "Orders", icon: <FaShoppingCart /> },
  ];

  return (
    <BrowserRouter>
      <div className="d-flex" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh" }}>
        
        {/* Glossy Sidebar */}
        <div
          style={{
            width: isSidebarCollapsed ? "80px" : "280px",
            minHeight: "100vh",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            borderRadius: "0 20px 20px 0",
            transition: "all 0.3s ease",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <div className="p-4 border-bottom" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            {!isSidebarCollapsed ? (
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 style={{ 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                    margin: 0
                  }}>
                    Inventory Pro
                  </h3>
                  <small style={{ color: "#666" }}>Admin Panel</small>
                </div>
                <HiOutlineMenuAlt2 
                  style={{ cursor: "pointer", fontSize: "24px", color: "#667eea" }}
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
              </div>
            ) : (
              <div className="text-center">
                <HiOutlineMenuAlt2 
                  style={{ cursor: "pointer", fontSize: "24px", color: "#667eea" }}
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
                <div className="mt-2">
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "10px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold"
                  }}>
                    IP
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setActiveMenu(item.path)}
                style={{
                  textDecoration: "none",
                  display: "block",
                  padding: "12px 15px",
                  marginBottom: "8px",
                  borderRadius: "12px",
                  background: activeMenu === item.path ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
                  color: activeMenu === item.path ? "white" : "#333",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="menu-item"
              >
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: isSidebarCollapsed ? "center" : "flex-start",
                  gap: "12px"
                }}>
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                  {!isSidebarCollapsed && <span style={{ fontWeight: "500" }}>{item.name}</span>}
                </div>
              </Link>
            ))}
          </div>

          <div className="p-3" style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <div
              style={{
                padding: "12px 15px",
                borderRadius: "12px",
                background: "rgba(102, 126, 234, 0.1)",
                cursor: "pointer",
                textAlign: isSidebarCollapsed ? "center" : "left"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: isSidebarCollapsed ? "center" : "flex-start" }}>
                <FaSignOutAlt style={{ color: "#667eea" }} />
                {!isSidebarCollapsed && <span style={{ color: "#667eea", fontWeight: "500" }}>Logout</span>}
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            padding: "15px 30px",
            margin: "20px 20px 0 20px",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h4 style={{ margin: 0, color: "#333", fontWeight: "600" }}>
                Welcome back, Admin!
              </h4>
              <small style={{ color: "#666" }}>Here's what's happening with your inventory today</small>
            </div>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <IoMdNotificationsOutline style={{ fontSize: "24px", color: "#667eea", cursor: "pointer" }} />
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                AD
              </div>
            </div>
          </div>

          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>

      <style>{`
        .menu-item:hover {
          transform: translateX(5px);
          background: rgba(102, 126, 234, 0.1) !important;
          color: #667eea !important;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }
      `}</style>
    </BrowserRouter>
  );
}

export default App;