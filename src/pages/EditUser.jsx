import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function EditUser() {
  const { userId, userName } = useParams();
  const [decodedName, setDecodedName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    if (userName) {
      setDecodedName(decodeURIComponent(userName));
    }
  }, [userName]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/${userId}`, {
          withCredentials: true,
        });
        const fetchedUser = response.data.User;
        if (fetchedUser) {
          setFormData({
            name: fetchedUser.name || "",
            email: fetchedUser.email || "",
            phone_number: fetchedUser.phone_number || "",
            address: fetchedUser.address || "",
          });
        }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form data:", formData);
    console.log(baseURL + "/users");
    setError(null);
    try {
      const response = await axios.patch(
        `${baseURL}/users/${userId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("User Updated successful:", response.data);
      setMessage("User Updated successfully");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.error || "User Updation failed");
        setMessageType("error");
      } else if (err.request) {
        setMessage("No response from server");
        setMessageType("error");
      } else {
        setMessage(err.message);
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
        <h2>Update User Details</h2>

        <Form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Name"
              id="username"
              name="username"
              value={decodedName}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label id="email">Email Addess</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contact Number"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Address"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="warning" type="submit">
            Update
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

export default EditUser;
