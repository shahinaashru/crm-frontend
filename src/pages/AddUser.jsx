import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
function AddUser() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form data:", formData);
    console.log(baseURL + "/users/add-user");
    setError(null);
    try {
      const response = await axios.post(`${baseURL}/users/add-user`, formData, {
        withCredentials: true,
      });
      console.log("User Added successful:", response.data);
      setMessage("User Added successfully");
      setMessageType("success");
      setFormData({
        username: "",
        password: "",
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
        <h2>Add New User</h2>

        <Form onSubmit={handleSubmit} style={{ paddingTop: "50px" }}>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="User name"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="warning" type="submit">
            Add User
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

export default AddUser;
