import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
function Customer() {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${baseURL}/customers`, {
          withCredentials: true,
        });
        setCustomers(response.data.Customers);
      } catch (err) {
        if (err.response) {
          setError(
            err.response?.data?.error ||
              err.response?.data?.message ||
              `Access denied or unauthorized`
          );
        } else if (err.request) {
          setError("No response from server");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseURL}/customers/${id}`, {
        withCredentials: true,
      });
      setCustomers((prev) => prev.filter((cust) => cust._id !== id));
      setMessage("Customer deleted successfully");
      setMessageType("success");
      clearMessage();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
        setMessageType("error");
      } else {
        setMessage("Something went wrong.");
        setMessageType("error");
      }
      clearMessage();
    }
  };
  if (loading) return <p className="text-center mt-4">Loading customers...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;
  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  return (
    <Container fluid style={{ padding: "20px 50px" }}>
      <h2>Customer Details</h2>

      {/* Table Container with shadow and padding */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Link to="/crm/add-customer">
          <Button
            style={{
              float: "right",
              marginBottom: "20px",
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              color: "#000",
            }}
          >
            Add Customer
          </Button>
        </Link>
        {message && (
          <p
            className="blink"
            style={{
              color: messageType === "success" ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {message}
          </p>
        )}
        {Array.isArray(customers) && customers.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 10px",
            }}
          >
            <thead
              style={{
                backgroundColor: "#FFF3CD",
                textAlign: "left",
              }}
            >
              <tr
                style={{
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "12px", borderTopLeftRadius: "8px" }}>
                  #
                </th>
                <th style={{ padding: "12px" }}>Name</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Phone Number</th>
                <th style={{ padding: "12px" }}>Address</th>
                <th style={{ padding: "12px" }}>Created At</th>
                <th style={{ padding: "12px" }}>Updated At</th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  key={customer._id || index}
                  style={{
                    backgroundColor: "#F9F9F9",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <td style={{ padding: "12px", borderRadius: "8px 0 0 8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: "12px" }}>{customer.name}</td>
                  <td style={{ padding: "12px" }}>{customer.email}</td>
                  <td style={{ padding: "12px" }}>{customer.phone_number}</td>
                  <td style={{ padding: "12px" }}>{customer.address}</td>
                  <td style={{ padding: "12px" }}>{customer.createdAt}</td>
                  <td style={{ padding: "12px" }}>{customer.updatedAt}</td>
                  <td style={{ textAlign: "center", padding: "12px" }}>
                    <Link to={`/crm/edit-customer/${customer._id}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ marginRight: "10px" }}
                      >
                        <FaEdit /> Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(customer._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-muted">No customer found.</p>
        )}
      </div>
    </Container>
  );
}

export default Customer;
