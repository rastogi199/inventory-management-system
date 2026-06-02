import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      alert(error.response?.data?.detail || "Error");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
      </div>

      {/* Form */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="mb-3">
            {editingId ? "Update Product" : "Add Product"}
          </h5>

          <form
            onSubmit={
              editingId
                ? updateProduct
                : addProduct
            }
          >
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
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
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
                />
              </div>

              <div className="col-md-3 d-flex gap-2">

                <button
                  type="submit"
                  className={
                    editingId
                      ? "btn btn-warning flex-fill"
                      : "btn btn-primary flex-fill"
                  }
                >
                  {editingId
                    ? "Update"
                    : "Add Product"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </div>
          </form>
        </div>
      </div>

      {/* Table */}

      <div className="card shadow-sm">
        <div className="card-body">

          <h5 className="mb-3">
            Product List
          </h5>

          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

<tbody>

  {loading ? (

    <tr>
      <td
        colSpan="6"
        className="text-center py-5"
      >
        <div
          className="spinner-border text-primary"
          role="status"
        >
        </div>
      </td>
    </tr>

  ) : products.length > 0 ? (

    products.map((product) => (

      <tr key={product.id}>

        <td>{index+1}</td>

        <td>{product.name}</td>

        <td>{product.sku}</td>

        <td>₹ {product.price}</td>

        <td>{product.quantity}</td>

        <td>

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() =>
              editProduct(product)
            }
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() =>
              deleteProduct(product.id)
            }
          >
            Delete
          </button>

        </td>

      </tr>

    ))

  ) : (

    <tr>
      <td
        colSpan="6"
        className="text-center"
      >
        No Products Found
      </td>
    </tr>

  )}

</tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default Products;