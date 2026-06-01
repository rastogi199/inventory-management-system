import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

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

    // Testing ke liye optional
    // await new Promise(
    //   resolve => setTimeout(resolve, 1500)
    // );

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

    } catch (error) {
      alert(
        error.response?.data?.detail || "Error"
      );
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find(
      (c) => c.id === customerId
    );

    return customer
      ? customer.full_name
      : "Unknown";
  };

  const getProductName = (productId) => {
    const product = products.find(
      (p) => p.id === productId
    );

    return product
      ? product.name
      : "Unknown";
  };

  const deleteOrder = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this order?"
  );

  if (!confirmDelete) return;

  try {

    await api.delete(
      `/orders/${id}`
    );

    fetchOrders();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h2 className="mb-4">
        Orders
      </h2>

      {/* Create Order */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <h5 className="mb-3">
            Create Order
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
                >
                  <option value="">
                    Select Customer
                  </option>

                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
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
                >
                  <option value="">
                    Select Product
                  </option>

                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name}
                      {" "}
                      (Stock: {product.quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Qty"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Create
                </button>
              </div>

            </div>

          </form>

        </div>
      </div>

      {/* Orders Table */}

      <div className="card shadow-sm">
        <div className="card-body">

          <h5 className="mb-3">
            Order List
          </h5>

          <table className="table table-hover">

           <thead className="table-dark">
            <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Action</th>
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

  ) : orders.length > 0 ? (

    orders.map((order) => (

      <tr key={order.id}>

        <td>{order.id}</td>

        <td>
          {getCustomerName(
            order.customer_id
          )}
        </td>

        <td>
          {getProductName(
            order.product_id
          )}
        </td>

        <td>{order.quantity}</td>

        <td>
          ₹ {order.total_amount}
        </td>

        <td>

          <button
            className="btn btn-danger btn-sm"
            onClick={() =>
              deleteOrder(order.id)
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
        No Orders Found
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

export default Orders;