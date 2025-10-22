import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
function Case() {
  const [cases, setCases] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(`${baseURL}/cases`, {
          withCredentials: true,
        });
        setCases(response.data.Cases);
        console.log(cases);
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

    fetchCases();
  }, []);
  const changeStatus = async (id, status) => {
    try {
      await axios.patch(
        `${baseURL}/cases/${id}`,
        { status: status },
        {
          withCredentials: true,
        }
      );
      setMessage("Case Status Updated");
      setMessageType("success");
      clearMessage();
    } catch (err) {
      console.log("Update failed:", err.message);
      setMessage(
        "Update failed:",
        err.response?.data?.error ||
          err.response?.data?.message ||
          `Access denied or unauthorized`
      );
      setMessageType("error");
      clearMessage();
    }
  };
  if (loading) return <p className="text-center mt-4">Loading cases...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;
  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  return (
    <Container fluid style={{ padding: "20px 50px" }}>
      <h2>Case Details</h2>

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
        <Link to="/crm/add-case">
          <Button
            style={{
              float: "right",
              marginBottom: "20px",
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              color: "#000",
            }}
          >
            Add Case
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
        {Array.isArray(cases) && cases.length > 0 ? (
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
                <th style={{ padding: "12px" }}>Case Name</th>
                <th style={{ padding: "12px" }}>Case Description</th>
                <th style={{ padding: "12px" }}>Customer Name</th>
                <th style={{ padding: "12px" }}>Assigned To</th>
                <th style={{ padding: "12px" }}>Priority</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Created At</th>
                <th style={{ padding: "12px" }}>Updated At</th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cases.map((task, index) => (
                <tr
                  key={task._id || index}
                  style={{
                    backgroundColor: "#F9F9F9",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <td style={{ padding: "12px", borderRadius: "8px 0 0 8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: "12px" }}>{task.case_name}</td>
                  <td style={{ padding: "12px" }}>{task.case_description}</td>
                  <td style={{ padding: "12px" }}>
                    {task.customer_id?.name || "N/A"}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {task.assigned_to?.username || "Unassigned"}
                  </td>
                  <td style={{ padding: "12px" }}>{task.priority}</td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        marginRight: "8px",
                        backgroundColor:
                          task.status === "open"
                            ? "yellow"
                            : task.status === "on_hold"
                            ? "orange"
                            : task.status === "in_progress"
                            ? "blue"
                            : task.status === "resolved"
                            ? "green"
                            : task.status === "closed"
                            ? "gray"
                            : "black",
                      }}
                    ></span>
                    {task.status}
                  </td>
                  <td style={{ padding: "12px" }}>{task.createdAt}</td>
                  <td style={{ padding: "12px" }}>{task.updatedAt}</td>
                  <td style={{ textAlign: "center", padding: "12px" }}>
                    <Dropdown>
                      <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        change status
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => changeStatus(task._id, "in_progress")}
                        >
                          In Progress
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => changeStatus(task._id, "on_hold")}
                        >
                          On Hold
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => changeStatus(task._id, "resolved")}
                        >
                          Resolved
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => changeStatus(task._id, "closed")}
                        >
                          Closed
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-muted">No case found.</p>
        )}
      </div>
    </Container>
  );
}

export default Case;
