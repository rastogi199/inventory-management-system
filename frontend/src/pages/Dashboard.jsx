// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { FaBox, FaUsers, FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";

// function Dashboard() {
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/dashboard");
//       setStats(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statsData = [
//     { title: "Total Products", value: stats.total_products, icon: <FaBox />, color: "#667eea" },
//     { title: "Total Customers", value: stats.total_customers, icon: <FaUsers />, color: "#48bb78" },
//     { title: "Total Orders", value: stats.total_orders, icon: <FaShoppingCart />, color: "#ed8936" },
//     { title: "Low Stock", value: stats.low_stock_products, icon: <FaExclamationTriangle />, color: "#f56565" },
//   ];

//   return (
//     <div>
//       <h2 className="mb-4" style={{ color: "#333", fontWeight: "600" }}>
//         Dashboard
//       </h2>

//       <div className="row g-4">
//         {statsData.map((stat, index) => (
//           <div className="col-md-3" key={index}>
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "15px",
//                 padding: "20px",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//                 borderLeft: `4px solid ${stat.color}`,
//                 transition: "transform 0.3s",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-5px)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//               }}
//             >
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 style={{ color: "#666", marginBottom: "10px", fontSize: "14px" }}>
//                     {stat.title}
//                   </h6>
//                   <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: 0, color: "#333" }}>
//                     {loading ? (
//                       <div
//                         className="spinner-border spinner-border-sm"
//                         role="status"
//                         style={{ color: stat.color }}
//                       ></div>
//                     ) : (
//                       stat.value || 0
//                     )}
//                   </h2>
//                 </div>
//                 <div
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     borderRadius: "10px",
//                     background: `${stat.color}20`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: stat.color,
//                     fontSize: "24px",
//                   }}
//                 >
//                   {stat.icon}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity Section */}
//       {/* <div className="mt-5">
//         <div className="row">
//           <div className="col-md-6">
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "15px",
//                 padding: "20px",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
//                 Recent Orders
//               </h5>
//               <div style={{ overflowX: "auto" }}>
//                 <table className="table" style={{ marginBottom: 0 }}>
//                   <thead>
//                     <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
//                       <th style={{ padding: "10px", color: "#666", fontSize: "13px" }}>Order ID</th>
//                       <th style={{ padding: "10px", color: "#666", fontSize: "13px" }}>Amount</th>
//                       <th style={{ padding: "10px", color: "#666", fontSize: "13px" }}>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td style={{ padding: "10px", fontSize: "14px" }}>#ORD001</td>
//                       <td style={{ padding: "10px", fontSize: "14px" }}>$450</td>
//                       <td style={{ padding: "10px" }}>
//                         <span style={{ background: "#48bb7820", color: "#48bb78", padding: "3px 10px", borderRadius: "12px", fontSize: "12px" }}>
//                           Completed
//                         </span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ padding: "10px", fontSize: "14px" }}>#ORD002</td>
//                       <td style={{ padding: "10px", fontSize: "14px" }}>$780</td>
//                       <td style={{ padding: "10px" }}>
//                         <span style={{ background: "#ed893620", color: "#ed8936", padding: "3px 10px", borderRadius: "12px", fontSize: "12px" }}>
//                           Pending
//                         </span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ padding: "10px", fontSize: "14px" }}>#ORD003</td>
//                       <td style={{ padding: "10px", fontSize: "14px" }}>$320</td>
//                       <td style={{ padding: "10px" }}>
//                         <span style={{ background: "#4299e120", color: "#4299e1", padding: "3px 10px", borderRadius: "12px", fontSize: "12px" }}>
//                           Processing
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "15px",
//                 padding: "20px",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
//                 Low Stock Alerts
//               </h5>
//               <div className="alert alert-warning" style={{ borderRadius: "10px" }}>
//                 <strong>⚠️ 5 products</strong> are running low on stock
//               </div>
//               <div className="alert alert-danger" style={{ borderRadius: "10px" }}>
//                 <strong>⚠️ 2 products</strong> are out of stock
//               </div>
//               <button
//                 className="btn btn-primary mt-2"
//                 style={{
//                   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                   border: "none",
//                   borderRadius: "8px",
//                   padding: "8px 20px",
//                 }}
//               >
//                 View All Products
//               </button>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../services/api";
import { 
  FaBox, FaUsers, FaShoppingCart, FaExclamationTriangle, 
  FaChartLine, FaChartBar, FaChartPie, FaArrowUp, FaArrowDown 
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [dashboardRes, productsRes, ordersRes, customersRes] = await Promise.all([
        api.get("/dashboard"),
        api.get("/products"),
        api.get("/orders"),
        api.get("/customers")
      ]);
      
      setStats(dashboardRes.data);
      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);
      setCustomers(customersRes.data || []);
      setRecentOrders((ordersRes.data || []).slice(-5).reverse());
      setLowStockProducts((productsRes.data || []).filter(p => p.quantity < 10 && p.quantity > 0));
      
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatusData = () => {
    if (!products.length) {
      return { labels: ['No Data'], datasets: [{ data: [1], backgroundColor: ['#ccc'] }] };
    }
    
    const inStock = products.filter(p => p.quantity >= 10).length;
    const lowStock = products.filter(p => p.quantity < 10 && p.quantity > 0).length;
    const outOfStock = products.filter(p => p.quantity === 0).length;
    
    return {
      labels: ['In Stock', 'Low Stock', 'Out of Stock'],
      datasets: [{
        data: [inStock, lowStock, outOfStock],
        backgroundColor: ['#48bb78', '#ed8936', '#f56565'],
        borderWidth: 0,
      }],
    };
  };

  const getProductStockData = () => {
    if (!products.length) {
      return { labels: ['No Products'], datasets: [{ label: 'Stock', data: [0], backgroundColor: '#ccc' }] };
    }
    
    const topProducts = [...products].sort((a, b) => b.quantity - a.quantity).slice(0, 8);
    
    return {
      labels: topProducts.map(p => p.name.length > 15 ? p.name.slice(0, 15) + '...' : p.name),
      datasets: [{
        label: 'Stock Quantity',
        data: topProducts.map(p => p.quantity),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderRadius: 6,
      }],
    };
  };

  const getRevenueByProductData = () => {
    if (!products.length || !orders.length) {
      return { labels: ['No Data'], datasets: [{ label: 'Revenue', data: [0], backgroundColor: '#ccc' }] };
    }
    
    const productRevenue = new Map();
    orders.forEach(order => {
      const product = products.find(p => p.id === order.product_id);
      if (product) {
        const revenue = order.quantity * product.price;
        productRevenue.set(product.name, (productRevenue.get(product.name) || 0) + revenue);
      }
    });
    
    const sortedProducts = Array.from(productRevenue.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
    
    return {
      labels: sortedProducts.map(p => p[0].length > 12 ? p[0].slice(0, 12) + '...' : p[0]),
      datasets: [{
        label: 'Revenue (₹)',
        data: sortedProducts.map(p => p[1]),
        backgroundColor: 'rgba(72, 187, 120, 0.8)',
        borderRadius: 6,
      }],
    };
  };

  const getCustomerOrdersData = () => {
    if (!customers.length || !orders.length) {
      return { labels: ['No Data'], datasets: [{ data: [1], backgroundColor: ['#ccc'] }] };
    }
    
    const customerOrders = new Map();
    orders.forEach(order => {
      const customer = customers.find(c => c.id === order.customer_id);
      const customerName = customer ? customer.full_name : 'Unknown';
      customerOrders.set(customerName, (customerOrders.get(customerName) || 0) + 1);
    });
    
    const topCustomers = Array.from(customerOrders.entries()).sort((a, b) => b[1] - a[1]).slice(0, 4);
    
    return {
      labels: topCustomers.map(c => c[0].length > 12 ? c[0].slice(0, 12) + '...' : c[0]),
      datasets: [{
        data: topCustomers.map(c => c[1]),
        backgroundColor: ['#667eea', '#48bb78', '#ed8936', '#f56565'],
        borderWidth: 0,
      }],
    };
  };

  const statsData = [
    { title: "Total Products", value: stats.total_products, icon: <FaBox />, color: "#667eea",  },
    { title: "Total Customers", value: stats.total_customers, icon: <FaUsers />, color: "#48bb78", },
    { title: "Total Orders", value: stats.total_orders, icon: <FaShoppingCart />, color: "#ed8936",  },
    { title: "Low Stock", value: stats.low_stock_products, icon: <FaExclamationTriangle />, color: "#f56565", },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10 } },
      tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', cornerRadius: 8 }
    }
  };

  const barOptions = {
    ...chartOptions,
    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { stepSize: 1 } } }
  };

  return (
    <div style={{ padding: "0 0 20px 0" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ margin: 0, color: "#1a1a2e", fontWeight: "700", fontSize: "24px" }}>Dashboard</h2>
        {/* <p style={{ color: "#666", marginTop: "4px", fontSize: "14px" }}>Overview of your store performance</p> */}
      </div>

      {/* Stats Cards Grid */}
      <div className="row g-3 mb-4">
        {statsData.map((stat, index) => (
          <div className="col-md-3 col-sm-6" key={index}>
            <div style={{
              background: "white",
              borderRadius: "16px",
              padding: "18px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              borderLeft: `3px solid ${stat.color}`,
              transition: "all 0.2s",
            }}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p style={{ color: "#8b8b9b", fontSize: "13px", marginBottom: "8px", fontWeight: "500" }}>
                    {stat.title}
                  </p>
                  <h3 style={{ fontSize: "28px", fontWeight: "700", margin: 0, color: "#1a1a2e" }}>
                    {loading ? <span className="spinner-border spinner-border-sm" style={{ color: stat.color }} /> : (stat.value || 0)}
                  </h3>
                  
                </div>
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: `${stat.color}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                  fontSize: "20px",
                }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Stock Status & Orders Trend */}
      

      {/* Row 2: Revenue & Top Customers */}
      <div className="row g-3 mb-4">
        <div className="col-md-7">
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "18px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            height: "320px",
          }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaChartBar style={{ color: "#48bb78", fontSize: "16px" }} />
              <h5 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#333" }}>Top Products by Revenue</h5>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-primary" style={{ width: "32px", height: "32px" }} />
              </div>
            ) : (
              <div style={{ height: "260px" }}>
                <Bar data={getRevenueByProductData()} options={barOptions} />
              </div>
            )}
          </div>
        </div>

        <div className="col-md-5">
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "18px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            height: "320px",
          }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaChartPie style={{ color: "#ed8936", fontSize: "16px" }} />
              <h5 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#333" }}>Top Customers</h5>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-primary" style={{ width: "32px", height: "32px" }} />
              </div>
            ) : (
              <div style={{ height: "260px" }}>
                <Pie data={getCustomerOrdersData()} options={chartOptions} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Low Stock Alerts & Recent Orders */}
      <div className="row g-3">
        <div className="col-md-4">
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "18px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            height: "380px",
            display: "flex",
            flexDirection: "column",
          }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaExclamationTriangle style={{ color: "#f56565", fontSize: "16px" }} />
              <h5 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#333" }}>Low Stock Alerts</h5>
            </div>
            
            {loading ? (
              <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <div className="spinner-border text-primary" style={{ width: "32px", height: "32px" }} />
              </div>
            ) : lowStockProducts.length > 0 ? (
              <div style={{ flex: 1, overflowY: "auto" }}>
                {lowStockProducts.slice(0, 5).map(product => (
                  <div key={product.id} style={{
                    padding: "12px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    background: "#fff5f5",
                    borderLeft: `3px solid ${product.quantity === 0 ? "#f56565" : "#ed8936"}`,
                  }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ flex: 1 }}>
                        <h6 style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#333" }}>{product.name}</h6>
                        <small style={{ color: "#666", fontSize: "11px" }}>SKU: {product.sku}</small>
                      </div>
                      <span style={{
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "600",
                        background: product.quantity === 0 ? "#f5656520" : "#ed893620",
                        color: product.quantity === 0 ? "#f56565" : "#ed8936",
                      }}>
                        {product.quantity === 0 ? "Out of Stock" : `${product.quantity} left`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5" style={{ color: "#48bb78" }}>
                <FaBox style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.5 }} />
                <p style={{ fontSize: "13px" }}>All products have sufficient stock</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-8">
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "18px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            height: "380px",
            display: "flex",
            flexDirection: "column",
          }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaShoppingCart style={{ color: "#667eea", fontSize: "16px" }} />
              <h5 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#333" }}>Recent Orders</h5>
            </div>
            
            <div style={{ flex: 1, overflowY: "auto" }}>
              <table style={{ width: "100%", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #eef2f6" }}>
                    <th style={{ padding: "8px 0", textAlign: "left", color: "#666", fontWeight: "500" }}>Order ID</th>
                    <th style={{ padding: "8px 0", textAlign: "left", color: "#666", fontWeight: "500" }}>Customer</th>
                    <th style={{ padding: "8px 0", textAlign: "left", color: "#666", fontWeight: "500" }}>Product</th>
                    <th style={{ padding: "8px 0", textAlign: "center", color: "#666", fontWeight: "500" }}>Qty</th>
                    <th style={{ padding: "8px 0", textAlign: "right", color: "#666", fontWeight: "500" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" className="text-center py-4"><div className="spinner-border spinner-border-sm" /></td></tr>
                  ) : recentOrders.length > 0 ? (
                    recentOrders.map((order) => {
                      const customer = customers.find(c => c.id === order.customer_id);
                      const product = products.find(p => p.id === order.product_id);
                      const total = order.quantity * (product?.price || 0);
                      return (
                        <tr key={order.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                          <td style={{ padding: "10px 0", fontWeight: "500" }}>#{order.id}</td>
                          <td style={{ padding: "10px 0", color: "#555" }}>{customer?.full_name?.split(' ')[0] || "Unknown"}</td>
                          <td style={{ padding: "10px 0", color: "#555" }}>{product?.name?.length > 20 ? product.name.slice(0, 20) + '...' : product?.name}</td>
                          <td style={{ padding: "10px 0", textAlign: "center" }}>{order.quantity}</td>
                          <td style={{ padding: "10px 0", textAlign: "right", fontWeight: "600", color: "#667eea" }}>₹{total.toLocaleString()}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr><td colSpan="5" className="text-center py-4" style={{ color: "#999" }}>No orders found</td></tr>
                  )}
                </tbody>
               </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;