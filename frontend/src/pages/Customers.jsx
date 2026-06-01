import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

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

    } catch (error) {
      alert(
        error.response?.data?.detail || "Error"
      );
    }
  };

  const editCustomer = (customer) => {

    setEditingId(customer.id);

    setFormData({
      full_name: customer.full_name,
      email: customer.email,
      phone: customer.phone,
    });
  };

  const updateCustomer = async (e) => {
    e.preventDefault();

    try {

      await api.put(
        `/customers/${editingId}`,
        formData
      );

      resetForm();

      fetchCustomers();

    } catch (error) {
      alert(
        error.response?.data?.detail || "Error"
      );
    }
  };

  const deleteCustomer = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this customer?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/customers/${id}`
      );

      fetchCustomers();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h2 className="mb-4">
        Customers
      </h2>

      {/* Form */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h5 className="mb-3">
            {
              editingId
                ? "Update Customer"
                : "Add Customer"
            }
          </h5>

          <form
            onSubmit={
              editingId
                ? updateCustomer
                : addCustomer
            }
          >

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
                />
              </div>

              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-2 d-flex gap-2">

                <button
                  type="submit"
                  className={
                    editingId
                      ? "btn btn-warning flex-fill"
                      : "btn btn-primary flex-fill"
                  }
                >
                  {
                    editingId
                      ? "Update"
                      : "Add"
                  }
                </button>

                {
                  editingId && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )
                }

              </div>

            </div>

          </form>

        </div>

      </div>

      {/* Table */}

      <div className="card shadow-sm">

        <div className="card-body">

          <h5>
            Customer List
          </h5>

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>

            </thead>

<tbody>

  {loading ? (

    <tr>
      <td
        colSpan="5"
        className="text-center py-5"
      >
        <div
          className="spinner-border text-primary"
          role="status"
        >
        </div>
      </td>
    </tr>

  ) : customers.length > 0 ? (

    customers.map((customer) => (

      <tr key={customer.id}>

        <td>{customer.id}</td>

        <td>{customer.full_name}</td>

        <td>{customer.email}</td>

        <td>{customer.phone}</td>

        <td>

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() =>
              editCustomer(customer)
            }
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() =>
              deleteCustomer(customer.id)
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
        colSpan="5"
        className="text-center"
      >
        No Customers Found
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

export default Customers;