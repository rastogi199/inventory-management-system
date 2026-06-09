import { useEffect, useState } from "react";
import api from "../services/api";
import { FaBox, FaEdit, FaTrash, FaPlus, FaTimes, FaSearch } from "react-icons/fa";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
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

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });
      resetForm();
      fetchProducts();
      setShowForm(false);
    } catch (error) {
      alert(error.response?.data?.detail || "Error");
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
    });
    setShowForm(true);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${editingId}`, {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });
      resetForm();
      fetchProducts();
      setShowForm(false);
    } catch (error) {
      alert(error.response?.data?.detail || "Error");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      sku: "",
      price: "",
      quantity: "",
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: "Out of Stock", color: "#f56565", bg: "#f5656520" };
    if (quantity < 10) return { text: "Low Stock", color: "#ed8936", bg: "#ed893620" };
    return { text: "In Stock", color: "#48bb78", bg: "#48bb7820" };
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ margin: 0, color: "#333", fontWeight: "700" }}>Products Management</h2>
        {/* <p style={{ color: "#666", marginTop: "5px" }}>Manage your inventory products</p> */}
      </div>

      {/* Action Bar - Button Left & Search Right */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        gap: "20px"
      }}>
        {/* Add Product Button - Left Side */}
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
            <FaPlus /> Add New Product
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
              placeholder="Search products by name or SKU..."
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

      {/* Form Modal/Card */}
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
            {editingId ? "✏️ Update Product" : "➕ Add New Product"}
          </h5>

          <form onSubmit={editingId ? updateProduct : addProduct}>
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price (₹)"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
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
              <div className="col-md-3 d-flex gap-2">
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
                  {editingId ? "Update Product" : "Add Product"}
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

      {/* Products Table */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        overflowX: "auto"
      }}>
        <h5 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>
          Product List
        </h5>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>ID</th>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>Name</th>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>SKU</th>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>Price</th>
              <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>Quantity</th>
              {/* <th style={{ textAlign: "left", padding: "12px", color: "#666", fontWeight: "600" }}>Status</th> */}
              <th style={{ textAlign: "center", padding: "12px", color: "#666", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "50px" }}>
                  <div className="spinner-border text-primary" role="status" />
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.quantity);
                return (
                  <tr key={product.id} style={{ borderBottom: "1px solid #f0f0f0", transition: "background 0.3s" }} className="product-row">
                    <td style={{ padding: "12px", fontWeight: "500" }}>{product.id}</td>
                    <td style={{ padding: "12px", fontWeight: "500" }}>{product.name}</td>
                    <td style={{ padding: "12px", color: "#666" }}>{product.sku}</td>
                    <td style={{ padding: "12px", fontWeight: "600", color: "#667eea" }}>₹ {product.price}</td>
                    <td style={{ padding: "12px", fontWeight: "500" }}>{product.quantity}</td>
                    {/* <td style={{ padding: "12px" }}>
                      <span style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        background: stockStatus.bg,
                        color: stockStatus.color,
                        fontSize: "12px",
                        fontWeight: "500"
                      }}>
                        {stockStatus.text}
                      </span>
                    </td> */}
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button
                        onClick={() => editProduct(product)}
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
                        onClick={() => deleteProduct(product.id)}
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
                <td colSpan="7" style={{ textAlign: "center", padding: "50px", color: "#999" }}>
                  <FaBox style={{ fontSize: "48px", marginBottom: "10px", opacity: 0.3 }} />
                  <p>No products found</p>
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
        
        .product-row:hover {
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

export default Products;