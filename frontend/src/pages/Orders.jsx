// import { useEffect, useState } from "react";
// import api from "../services/api";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [customers, setCustomers] = useState([]);
//   const [products, setProducts] = useState([]);

//   const [formData, setFormData] = useState({
//     customer_id: "",
//     product_id: "",
//     quantity: "",
//   });

//   useEffect(() => {
//     fetchOrders();
//     fetchCustomers();
//     fetchProducts();
//   }, []);

// const fetchOrders = async () => {
//   try {

//     setLoading(true);

//     const response = await api.get("/orders");

//     // Testing ke liye optional
//     // await new Promise(
//     //   resolve => setTimeout(resolve, 1500)
//     // );

//     setOrders(response.data);

//   } catch (error) {

//     console.log(error);

//   } finally {

//     setLoading(false);

//   }
// };

//   const fetchCustomers = async () => {
//     try {
//       const response = await api.get("/customers");
//       setCustomers(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await api.get("/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const createOrder = async (e) => {
//     e.preventDefault();

//     try {
//       await api.post("/orders", {
//         customer_id: Number(formData.customer_id),
//         product_id: Number(formData.product_id),
//         quantity: Number(formData.quantity),
//       });

//       setFormData({
//         customer_id: "",
//         product_id: "",
//         quantity: "",
//       });

//       fetchOrders();
//       fetchProducts();

//     } catch (error) {
//       alert(
//         error.response?.data?.detail || "Error"
//       );
//     }
//   };

//   const getCustomerName = (customerId) => {
//     const customer = customers.find(
//       (c) => c.id === customerId
//     );

//     return customer
//       ? customer.full_name
//       : "Unknown";
//   };

//   const getProductName = (productId) => {
//     const product = products.find(
//       (p) => p.id === productId
//     );

//     return product
//       ? product.name
//       : "Unknown";
//   };

//   const deleteOrder = async (id) => {

//   const confirmDelete = window.confirm(
//     "Delete this order?"
//   );

//   if (!confirmDelete) return;

//   try {

//     await api.delete(
//       `/orders/${id}`
//     );

//     fetchOrders();

//   } catch (error) {
//     console.log(error);
//   }
// };

//   return (
//     <div>
//       <h2 className="mb-4">
//         Orders
//       </h2>

//       {/* Create Order */}

//       <div className="card shadow-sm mb-4">
//         <div className="card-body">

//           <h5 className="mb-3">
//             Create Order
//           </h5>

//           <form onSubmit={createOrder}>

//             <div className="row g-3">

//               <div className="col-md-4">
//                 <select
//                   className="form-select"
//                   name="customer_id"
//                   value={formData.customer_id}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">
//                     Select Customer
//                   </option>

//                   {customers.map((customer) => (
//                     <option
//                       key={customer.id}
//                       value={customer.id}
//                     >
//                       {customer.full_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-4">
//                 <select
//                   className="form-select"
//                   name="product_id"
//                   value={formData.product_id}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">
//                     Select Product
//                   </option>

//                   {products.map((product) => (
//                     <option
//                       key={product.id}
//                       value={product.id}
//                     >
//                       {product.name}
//                       {" "}
//                       (Stock: {product.quantity})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-2">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Qty"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-2">
//                 <button
//                   type="submit"
//                   className="btn btn-success w-100"
//                 >
//                   Create
//                 </button>
//               </div>

//             </div>

//           </form>

//         </div>
//       </div>

//       {/* Orders Table */}

//       <div className="card shadow-sm">
//         <div className="card-body">

//           <h5 className="mb-3">
//             Order List
//           </h5>

//           <table className="table table-hover">

//            <thead className="table-dark">
//             <tr>
//                 <th>ID</th>
//                 <th>Customer Name</th>
//                 <th>Product Name</th>
//                 <th>Quantity</th>
//                 <th>Total Amount</th>
//                 <th>Action</th>
//             </tr>
//             </thead>

// <tbody>

//   {loading ? (

//     <tr>
//       <td
//         colSpan="6"
//         className="text-center py-5"
//       >
//         <div
//           className="spinner-border text-primary"
//           role="status"
//         >
//         </div>
//       </td>
//     </tr>

//   ) : orders.length > 0 ? (

//     orders.map((order) => (

//       <tr key={order.id}>

//         <td>{order.id}</td>

//         <td>
//           {getCustomerName(
//             order.customer_id
//           )}
//         </td>

//         <td>
//           {getProductName(
//             order.product_id
//           )}
//         </td>

//         <td>{order.quantity}</td>

//         <td>
//           ₹ {order.total_amount}
//         </td>

//         <td>

//           <button
//             className="btn btn-danger btn-sm"
//             onClick={() =>
//               deleteOrder(order.id)
//             }
//           >
//             Delete
//           </button>

//         </td>

//       </tr>

//     ))

//   ) : (

//     <tr>
//       <td
//         colSpan="6"
//         className="text-center"
//       >
//         No Orders Found
//       </td>
//     </tr>

//   )}

// </tbody>

//           </table>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Orders;


import { useEffect, useState } from "react";
import api from "../services/api";
import { FaShoppingCart, FaBox, FaUsers, FaTrash, FaPlus } from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createOrder = async (e) => {
    e.preventDefault();
    try {
      await api.post("/orders", {
        customer_id: Number(formData.customer_id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity),
      });

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: "",
      });

      fetchOrders();
      fetchProducts();
      setShowForm(false);
    } catch (error) {
      alert(error.response?.data?.detail || "Error");
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.full_name : "Unknown";
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown";
  };

  const getProductPrice = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.price : 0;
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Delete this order?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ margin: 0, color: "#333", fontWeight: "700" }}>Order Management</h2>
        <p style={{ color: "#666", marginTop: "5px" }}>Track and manage customer orders</p>
      </div>

      {/* Create Order Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            color: "white",
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "500",
            marginBottom: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "transform 0.3s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <FaPlus /> Create New Order
        </button>
      )}

      {/* Form Card */}
      {showForm && (
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          marginBottom: "30px",
          animation: "slideDown 0.3s ease-out"
        }}>
          <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
            🛍️ Create New Order
          </h5>

          <form onSubmit={createOrder}>
            <div className="row g-3">
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="customer_id"
                  value={formData.customer_id}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.quantity} | ₹{product.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </div>

              <div className="col-md-2 d-flex gap-2">
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontWeight: "500",
                    cursor: "pointer",
                    flex: 1
                  }}
                >
                  Create Order
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    background: "#e2e8f0",
                    border: "none",
                    color: "#666",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Orders Table */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        overflowX: "auto"
      }}>
        <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
          Order List
        </h5>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
              <th style={{ textAlign: "left", color: "#666", fontWeight: "600", width: "80px" }}>S.No</th>
              <th style={{ textAlign: "left", color: "#666", fontWeight: "600" }}>Customer Name</th>
              <th style={{ textAlign: "left", color: "#666", fontWeight: "600" }}>Product Name</th>
              <th style={{ textAlign: "center", color: "#666", fontWeight: "600", width: "100px" }}>Quantity</th>
              <th style={{ textAlign: "right", color: "#666", fontWeight: "600", width: "150px" }}>Total Amount</th>
              <th style={{ textAlign: "center", color: "#666", fontWeight: "600", width: "100px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "50px" }}>
                  <div className="spinner-border text-primary" role="status" />
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order, index) => {
                const productPrice = getProductPrice(order.product_id);
                const totalAmount = order.quantity * productPrice;
                
                return (
                  <tr key={order.id} style={{ borderBottom: "1px solid #f0f0f0", transition: "background 0.3s" }} className="order-row">
                    <td style={{ padding: "12px", fontWeight: "500", textAlign: "center" }}>
                      {index + 1}
                    </td>
                    <td style={{ padding: "12px", fontWeight: "500" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaUsers style={{ color: "#48bb78" }} />
                        {getCustomerName(order.customer_id)}
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaBox style={{ color: "#ed8936" }} />
                        {getProductName(order.product_id)}
                      </div>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "500" }}>
                      {order.quantity}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "600", color: "#667eea" }}>
                      ₹ {totalAmount.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#f56565",
                          cursor: "pointer",
                          padding: "5px 10px",
                          borderRadius: "8px",
                          transition: "all 0.3s"
                        }}
                        className="action-btn"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "50px", color: "#999" }}>
                  <FaShoppingCart style={{ fontSize: "48px", marginBottom: "10px", opacity: 0.3 }} />
                  <p>No orders found</p>
                  <button
                    onClick={() => setShowForm(true)}
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      color: "white",
                      padding: "8px 20px",
                      borderRadius: "10px",
                      marginTop: "10px",
                      cursor: "pointer"
                    }}
                  >
                    Create First Order
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .order-row:hover {
          background: #f8f9fa;
        }
        
        .action-btn:hover {
          transform: scale(1.05);
          background: rgba(245, 101, 101, 0.1);
        }
        
        select, input {
          transition: all 0.3s;
        }
        
        select:focus, input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
      `}</style>
    </div>
  );
}

export default Orders;