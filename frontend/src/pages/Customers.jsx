// import { useEffect, useState } from "react";
// import api from "../services/api";

// function Customers() {

//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

// const fetchCustomers = async () => {
//   try {

//     setLoading(true);

//     const response = await api.get("/customers");

//     setCustomers(response.data);

//   } catch (error) {

//     console.log(error);

//   } finally {

//     setLoading(false);

//   }
// };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const resetForm = () => {
//     setEditingId(null);

//     setFormData({
//       full_name: "",
//       email: "",
//       phone: "",
//     });
//   };

//   const addCustomer = async (e) => {
//     e.preventDefault();

//     try {
//       await api.post("/customers", formData);

//       resetForm();

//       fetchCustomers();

//     } catch (error) {
//       alert(
//         error.response?.data?.detail || "Error"
//       );
//     }
//   };

//   const editCustomer = (customer) => {

//     setEditingId(customer.id);

//     setFormData({
//       full_name: customer.full_name,
//       email: customer.email,
//       phone: customer.phone,
//     });
//   };

//   const updateCustomer = async (e) => {
//     e.preventDefault();

//     try {

//       await api.put(
//         `/customers/${editingId}`,
//         formData
//       );

//       resetForm();

//       fetchCustomers();

//     } catch (error) {
//       alert(
//         error.response?.data?.detail || "Error"
//       );
//     }
//   };

//   const deleteCustomer = async (id) => {

//     const confirmDelete = window.confirm(
//       "Delete this customer?"
//     );

//     if (!confirmDelete) return;

//     try {

//       await api.delete(
//         `/customers/${id}`
//       );

//       fetchCustomers();

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>

//       <h2 className="mb-4">
//         Customers
//       </h2>

//       {/* Form */}

//       <div className="card shadow-sm mb-4">

//         <div className="card-body">

//           <h5 className="mb-3">
//             {
//               editingId
//                 ? "Update Customer"
//                 : "Add Customer"
//             }
//           </h5>

//           <form
//             onSubmit={
//               editingId
//                 ? updateCustomer
//                 : addCustomer
//             }
//           >

//             <div className="row g-3">

//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Full Name"
//                   name="full_name"
//                   value={formData.full_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-4">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-2">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-2 d-flex gap-2">

//                 <button
//                   type="submit"
//                   className={
//                     editingId
//                       ? "btn btn-warning flex-fill"
//                       : "btn btn-primary flex-fill"
//                   }
//                 >
//                   {
//                     editingId
//                       ? "Update"
//                       : "Add"
//                   }
//                 </button>

//                 {
//                   editingId && (
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={resetForm}
//                     >
//                       Cancel
//                     </button>
//                   )
//                 }

//               </div>

//             </div>

//           </form>

//         </div>

//       </div>

//       {/* Table */}

//       <div className="card shadow-sm">

//         <div className="card-body">

//           <h5>
//             Customer List
//           </h5>

//           <table className="table table-hover">

//             <thead className="table-dark">

//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Action</th>
//               </tr>

//             </thead>

// <tbody>

//   {loading ? (

//     <tr>
//       <td
//         colSpan="5"
//         className="text-center py-5"
//       >
//         <div
//           className="spinner-border text-primary"
//           role="status"
//         >
//         </div>
//       </td>
//     </tr>

//   ) : customers.length > 0 ? (

//     customers.map((customer) => (

//       <tr key={customer.id}>

//         <td>{customer.id}</td>

//         <td>{customer.full_name}</td>

//         <td>{customer.email}</td>

//         <td>{customer.phone}</td>

//         <td>

//           <button
//             className="btn btn-warning btn-sm me-2"
//             onClick={() =>
//               editCustomer(customer)
//             }
//           >
//             Edit
//           </button>

//           <button
//             className="btn btn-danger btn-sm"
//             onClick={() =>
//               deleteCustomer(customer.id)
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
//         colSpan="5"
//         className="text-center"
//       >
//         No Customers Found
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

// export default Customers;

import { useEffect, useState } from "react";
import api from "../services/api";
import { FaUsers, FaUserPlus, FaEdit, FaTrash, FaTimes, FaSearch, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      full_name: "",
      email: "",
      phone: "",
    });
  };

  const addCustomer = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers", formData);
      resetForm();
      fetchCustomers();
      setShowForm(false);
    } catch (error) {
      alert(error.response?.data?.detail || "Error");
    }
  };

  const editCustomer = (customer) => {
    setEditingId(customer.id);
    setFormData({
      full_name: customer.full_name,
      email: customer.email,
      phone: customer.phone,
    });
    setShowForm(true);
  };

  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/customers/${editingId}`, formData);
      resetForm();
      fetchCustomers();
      setShowForm(false);
    } catch (error) {
      alert(error.response?.data?.detail || "Error");
    }
  };

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm("Delete this customer?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ margin: 0, color: "#333", fontWeight: "700" }}>Customer Management</h2>
        <p style={{ color: "#666", marginTop: "5px" }}>Manage your customer database</p>
      </div>

      {/* Action Bar - Button Left & Search Right */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        gap: "20px"
      }}>
        {/* Add Customer Button - Left Side */}
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
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap"
            }}
          >
            <FaUserPlus /> Add New Customer
          </button>
        )}

        {/* Search Bar - Right Side */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          flex: 1,
          maxWidth: "400px"
        }}>
          <div style={{ position: "relative" }}>
            <FaSearch style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#999"
            }} />
            <input
              type="text"
              placeholder="Search customers by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px 12px 45px",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
        </div>
      </div>

      {/* Form Modal/Card - Same design as Products page */}
      {showForm && (
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          marginBottom: "30px",
          position: "relative",
          animation: "slideDown 0.3s ease-out"
        }}>
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            color: "#666",
            fontSize: "20px"
          }} onClick={() => { setShowForm(false); resetForm(); }}>
            <FaTimes />
          </div>
          
          <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
            {editingId ? "✏️ Update Customer" : "➕ Add New Customer"}
          </h5>

          <form onSubmit={editingId ? updateCustomer : addCustomer}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </div>
              <div className="col-md-2 d-flex gap-2">
                <button
                  type="submit"
                  style={{
                    background: editingId ? "#ed8936" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontWeight: "500",
                    cursor: "pointer",
                    flex: 1
                  }}
                >
                  {editingId ? "Update Customer" : "Add Customer"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); resetForm(); }}
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

      {/* Customers Table */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        overflowX: "auto"
      }}>
        <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
          Customer List
        </h5>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>ID</th>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>Customer Name</th>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>Email</th>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>Phone</th>
              <th style={{ textAlign: "center", padding: "12px", color: "#666", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "50px" }}>
                  <div className="spinner-border text-primary" role="status" />
                </td>
              </tr>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: "1px solid #f0f0f0", transition: "background 0.3s" }} className="customer-row">
                  <td style={{ padding: "12px", fontWeight: "500" }}>{customer.id}</td>
                  <td style={{ padding: "12px", fontWeight: "500" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white"
                      }}>
                        <FaUser />
                      </div>
                      {customer.full_name}
                    </div>
                  </td>
                  <td style={{ padding: "12px", color: "#667eea" }}>
                    <FaEnvelope style={{ marginRight: "8px", fontSize: "12px" }} />
                    {customer.email}
                  </td>
                  <td style={{ padding: "12px", color: "#666" }}>
                    <FaPhone style={{ marginRight: "8px", fontSize: "12px" }} />
                    {customer.phone}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => editCustomer(customer)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#667eea",
                        cursor: "pointer",
                        marginRight: "10px",
                        padding: "5px 10px",
                        borderRadius: "8px",
                        transition: "all 0.3s"
                      }}
                      className="action-btn"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteCustomer(customer.id)}
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
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "50px", color: "#999" }}>
                  <FaUsers style={{ fontSize: "48px", marginBottom: "10px", opacity: 0.3 }} />
                  <p>No customers found</p>
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
        
        .customer-row:hover {
          background: #f8f9fa;
        }
        
        .action-btn:hover {
          transform: scale(1.05);
        }
        
        .action-btn:first-child:hover {
          background: rgba(102, 126, 234, 0.1);
        }
        
        .action-btn:last-child:hover {
          background: rgba(245, 101, 101, 0.1);
        }
      `}</style>
    </div>
  );
}

export default Customers;