// import { useEffect, useState } from "react";
// import api from "../services/api";

// function Dashboard() {
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

// const fetchDashboard = async () => {
//   try {

//     setLoading(true);

//     const response = await api.get("/dashboard");

//     setStats(response.data);

//   } catch (error) {

//     console.log(error);

//   } finally {

//     setLoading(false);

//   }
// };

//   return (
//     <>
//       <h2 className="mb-4">
//         Dashboard
//       </h2>

//       <div className="row g-4">

//         <div className="col-md-3">
//           <div className="card bg-primary text-white shadow">
//             <div className="card-body">
//               <h6>Total Products</h6>
//                 <h1>
//                 {loading ? (
//                     <div
//                     className="spinner-border spinner-border-sm"
//                     role="status"
//                     ></div>
//                 ) : (
//                     stats.total_products
//                 )}
//                 </h1>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card bg-success text-white shadow">
//             <div className="card-body">
//               <h6>Total Customers</h6>
//                 <h1>
//                 {loading ? (
//                     <div
//                     className="spinner-border spinner-border-sm"
//                     role="status"
//                     ></div>
//                 ) : (
//                     stats.total_customers
//                 )}
//                 </h1>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card bg-warning text-white shadow">
//             <div className="card-body">
//               <h6>Total Orders</h6>
//                 <h1>
//                 {loading ? (
//                     <div
//                     className="spinner-border spinner-border-sm"
//                     role="status"
//                     ></div>
//                 ) : (
//                     stats.total_orders
//                 )}
//                 </h1>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card bg-danger text-white shadow">
//             <div className="card-body">
//               <h6>Low Stock</h6>
//                 <h1>
//                 {loading ? (
//                     <div
//                     className="spinner-border spinner-border-sm"
//                     role="status"
//                     ></div>
//                 ) : (
//                     stats.low_stock_products
//                 )}
//                 </h1>
//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import api from "../services/api";
import { FaBox, FaUsers, FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await api.get("/dashboard");
      setStats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { title: "Total Products", value: stats.total_products, icon: <FaBox />, color: "#667eea" },
    { title: "Total Customers", value: stats.total_customers, icon: <FaUsers />, color: "#48bb78" },
    { title: "Total Orders", value: stats.total_orders, icon: <FaShoppingCart />, color: "#ed8936" },
    { title: "Low Stock", value: stats.low_stock_products, icon: <FaExclamationTriangle />, color: "#f56565" },
  ];

  return (
    <div>
      <h2 className="mb-4" style={{ color: "#333", fontWeight: "600" }}>
        Dashboard
      </h2>

      <div className="row g-4">
        {statsData.map((stat, index) => (
          <div className="col-md-3" key={index}>
            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                borderLeft: `4px solid ${stat.color}`,
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 style={{ color: "#666", marginBottom: "10px", fontSize: "14px" }}>
                    {stat.title}
                  </h6>
                  <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: 0, color: "#333" }}>
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                        style={{ color: stat.color }}
                      ></div>
                    ) : (
                      stat.value || 0
                    )}
                  </h2>
                </div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                    background: `${stat.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                    fontSize: "24px",
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-5">
        <div className="row">
          <div className="col-md-6">
            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
                Recent Orders
              </h5>
              <div style={{ overflowX: "auto" }}>
                <table className="table" style={{ marginBottom: 0 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                      <th style={{ padding: "10px", color: "#666", fontSize: "13px" }}>Order ID</th>
                      <th style={{ padding: "10px", color: "#666", fontSize: "13px" }}>Amount</th>
                      <th style={{ padding: "10px", color: "#666", fontSize: "13px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "10px", fontSize: "14px" }}>#ORD001</td>
                      <td style={{ padding: "10px", fontSize: "14px" }}>$450</td>
                      <td style={{ padding: "10px" }}>
                        <span style={{ background: "#48bb7820", color: "#48bb78", padding: "3px 10px", borderRadius: "12px", fontSize: "12px" }}>
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px", fontSize: "14px" }}>#ORD002</td>
                      <td style={{ padding: "10px", fontSize: "14px" }}>$780</td>
                      <td style={{ padding: "10px" }}>
                        <span style={{ background: "#ed893620", color: "#ed8936", padding: "3px 10px", borderRadius: "12px", fontSize: "12px" }}>
                          Pending
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px", fontSize: "14px" }}>#ORD003</td>
                      <td style={{ padding: "10px", fontSize: "14px" }}>$320</td>
                      <td style={{ padding: "10px" }}>
                        <span style={{ background: "#4299e120", color: "#4299e1", padding: "3px 10px", borderRadius: "12px", fontSize: "12px" }}>
                          Processing
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
                Low Stock Alerts
              </h5>
              <div className="alert alert-warning" style={{ borderRadius: "10px" }}>
                <strong>⚠️ 5 products</strong> are running low on stock
              </div>
              <div className="alert alert-danger" style={{ borderRadius: "10px" }}>
                <strong>⚠️ 2 products</strong> are out of stock
              </div>
              <button
                className="btn btn-primary mt-2"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 20px",
                }}
              >
                View All Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;