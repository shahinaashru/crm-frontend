import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function EditCustomer() {
  const { customerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
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
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${baseURL}/customers/${customerId}`, {
          withCredentials: true,
        });
        const fetchedCustomer = response.data.Customer;
        if (fetchedCustomer) {
          setFormData({
            name: fetchedCustomer.name || "",
            email: fetchedCustomer.email || "",
            phone_number: fetchedCustomer.phone_number || "",
            address: fetchedCustomer.address || "",
          });
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error || "Failed to fetch customers");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form data:", formData);
    console.log(baseURL + "/customers");
    setError(null);
    try {
      const response = await axios.patch(
        `${baseURL}/customers/${customerId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Customer Updated successful:", response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
        setMessageType("error");
      } else {
        setMessage("Something went wrong.");
        setMessageType("error");
      }
      setError(err.message);
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
        <h2>Update Customer Details</h2>

        <Form onClick={handleSubmit} style={{ marginTop: "50px" }}>
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
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

export default EditCustomer;
