import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
function AddCase() {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [formData, setFormData] = useState({
    case_name: "",
    case_description: "",
    customer_id: "",
    assigned_to: "",
    priority: "",
    status: "open",
  });
  const [error, setError] = useState(null);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form data:", formData);
    console.log(baseURL + "/cases");
    setError(null);
    try {
      const response = await axios.post(`${baseURL}/cases/`, formData, {
        withCredentials: true,
      });
      console.log("Case Details Added successful:", response.data);

      setMessage("Case Added successfully!");
      setMessageType("success");
      setFormData({
        case_name: "",
        case_description: "",
        assigned_to: "",
        customer_id: "",
        priority: "",
      });
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
        setMessageType("error");
      } else {
        setMessage("Something went wrong.");
        setMessageType("error");
      }
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };
  return (
    <>
      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2>Add New Case</h2>

        <Form onSubmit={handleSubmit} style={{ paddingTop: "50px" }}>
          <Form.Group className="mb-3">
            <Form.Label>Case Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Case name"
              id="case_name"
              name="case_name"
              value={formData.case_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Case Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Case Description"
              id="case_description"
              name="case_description"
              value={formData.case_description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assigned To</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="assigned_to"
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              required
            >
              <option>Select User</option>
              {users.map((user, index) => (
                <option value={user._id}>{user.username}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="customer_id"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
            >
              <option>Select Customer</option>
              {customers.map((customer, index) => (
                <option value={customer._id}>{customer.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option>Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </Form.Select>
          </Form.Group>

          <Button variant="warning" type="submit">
            Submit
          </Button>
        </Form>
        {message !== "" && (
          <p
            className={`blink`}
            style={{
              color: messageType === "success" ? "green" : "red",
              // fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </>
  );
}

export default AddCase;
