import { useEffect, useState } from "react";
import api from "../services/api";

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

  return (
    <>
      <h2 className="mb-4">
        Dashboard
      </h2>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h6>Total Products</h6>
                <h1>
                {loading ? (
                    <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    ></div>
                ) : (
                    stats.total_products
                )}
                </h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h6>Total Customers</h6>
                <h1>
                {loading ? (
                    <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    ></div>
                ) : (
                    stats.total_customers
                )}
                </h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-white shadow">
            <div className="card-body">
              <h6>Total Orders</h6>
                <h1>
                {loading ? (
                    <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    ></div>
                ) : (
                    stats.total_orders
                )}
                </h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body">
              <h6>Low Stock</h6>
                <h1>
                {loading ? (
                    <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    ></div>
                ) : (
                    stats.low_stock_products
                )}
                </h1>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;