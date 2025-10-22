import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
function AddCustomer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form data:", formData);
    console.log(baseURL + "/customers");
    try {
      const response = await axios.post(`${baseURL}/customers/`, formData, {
        withCredentials: true,
      });
      setMessage("Customer updated successfully!");
      setMessageType("success");
      console.log("Customer Added successful:", response.data);
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        address: "",
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
        <h2>Add New Customer</h2>

        <Form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Customer Name"
              id="username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              required
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
              required
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
              required
            />
          </Form.Group>

          <Button variant="warning" type="submit">
            Add Customer
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

export default AddCustomer;
