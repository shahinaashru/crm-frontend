import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/style.css";
import { MdChecklist, MdPerson } from "react-icons/md";
import ActiveUsersChart from "./ActiveUsersChart";
import TaskStatusChart from "./TaskStatusChart";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
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
    <>
      <Container fluid style={{ padding: "50px 50px" }}>
        <Row>
          <Col md={9}>
            <div
              className="container-fluid text-center"
              style={{ padding: "0px", margin: "0px" }}
            >
              <div className="row">
                <div className="col">
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      backgroundColor: "#6d49dbff",
                      borderRadius: "10px",
                      boxShadow: "0 4px 20px rgba(158, 160, 11, 0.12)",
                    }}
                  >
                    <div className="card-body">
                      <MdPerson size={35} color="#fff" />
                      <h4 className="card-title" style={{ color: "#fff" }}>
                        Total Customers
                      </h4>
                      <h2 className="card-no" style={{ color: "#fff" }}>
                        5
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      borderRadius: "10px",
                      backgroundColor: "#ec6511ff",
                      boxShadow: "0 4px 20px rgba(158, 160, 11, 0.12)",
                    }}
                  >
                    <div className="card-body">
                      <MdPerson size={35} color="#fff" />
                      <h4 className="card-title" style={{ color: "#fff" }}>
                        Total Users
                      </h4>
                      <h2 className="card-no" style={{ color: "#fff" }}>
                        50
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      backgroundColor: "#39ab77ff",
                      borderRadius: "10px",
                      boxShadow: "0 4px 20px rgba(158, 160, 11, 0.12)",
                    }}
                  >
                    <div className="card-body">
                      <MdChecklist size={35} color="#fff" />
                      <h4 className="card-title" style={{ color: "#fff" }}>
                        Total Task
                      </h4>
                      <h2 className="card-no" style={{ color: "#fff" }}>
                        10
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                padding: "20px",
                marginTop: "100px",
              }}
            >
              <h5
                style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Active Customers
              </h5>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 10px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#FFF3CD",
                      textAlign: "left",
                    }}
                  >
                    <th style={{ padding: "12px", borderTopLeftRadius: "8px" }}>
                      #
                    </th>
                    <th style={{ padding: "12px" }}>Name</th>
                    <th style={{ padding: "12px" }}>Email</th>
                    <th style={{ padding: "12px" }}>Phone Number</th>
                    <th
                      style={{ padding: "12px", borderTopRightRadius: "8px" }}
                    >
                      Address
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
                      <td
                        style={{ padding: "12px", borderRadius: "8px 0 0 8px" }}
                      >
                        {index + 1}
                      </td>
                      <td style={{ padding: "12px" }}>{customer.name}</td>
                      <td style={{ padding: "12px" }}>{customer.email}</td>
                      <td style={{ padding: "12px" }}>
                        {customer.phone_number}
                      </td>
                      <td
                        style={{ padding: "12px", borderRadius: "0 8px 8px 0" }}
                      >
                        {customer.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
          <Col md="3">
            <div
              style={{
                border: "1px solid #fff",
                borderRadius: "8px",
                boxShadow: "0 1px 12px rgba(255, 255, 255, 0.10)",
                backgroundColor: "#fff",
                paddingBottom: "80px",
              }}
            >
              <TaskStatusChart />
            </div>
            <div style={{ paddingTop: "20px" }}>
              <ActiveUsersChart />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
