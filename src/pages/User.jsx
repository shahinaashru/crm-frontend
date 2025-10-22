import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
function User() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/users`, {
          withCredentials: true,
        });
        setUsers(response.data.User);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error || "Failed to fetch users");
        } else if (err.request) {
          setError("No response from server");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseURL}/users/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((cust) => cust._id !== id));
      setMessage("User deleted successfully");
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
  if (loading) return <p className="text-center mt-4">Loading users...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;
  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  return (
    <Container fluid style={{ padding: "20px 50px" }}>
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        User Details
      </h2>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Link to="/crm/add-user">
          <Button
            style={{
              float: "right",
              marginBottom: "20px",
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              color: "#000",
            }}
          >
            Add User
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
        {users.length > 0 ? (
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
                <th style={{ padding: "12px" }}>Username</th>
                <th style={{ padding: "12px" }}>Role</th>
                <th style={{ padding: "12px" }}>Created At</th>
                <th style={{ padding: "12px" }}>Updated At</th>
                <th style={{ textAlign: "center", padding: "12px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id || index}
                  style={{
                    backgroundColor: "#F9F9F9",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <td style={{ padding: "12px", borderRadius: "8px 0 0 8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: "12px" }}>{user.username}</td>
                  <td style={{ padding: "12px" }}>{user.role || "User"}</td>
                  <td style={{ padding: "12px" }}>{user.createdAt}</td>
                  <td style={{ padding: "12px" }}>{user.updatedAt}</td>
                  <td style={{ textAlign: "center", padding: "12px" }}>
                    <Link
                      to={`/crm/edit-user/${user._id}/${encodeURIComponent(
                        user.username
                      )}`}
                    >
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
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-muted">No users found.</p>
        )}
      </div>
    </Container>
  );
}

export default User;
