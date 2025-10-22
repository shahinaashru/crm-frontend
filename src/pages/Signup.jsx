import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const navigate = useNavigate();
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
    console.log(baseURL + "/users/register");
    setError(null);
    try {
      const response = await axios.post(baseURL + "/users/register", formData, {
        withCredentials: true,
      });
      console.log("Signup successful:", response.data);
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Signup failed");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError(err.message);
      }
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
        <h2>Signup</h2>

        <Form onSubmit={handleSubmit}>
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
          <span style={{ color: "red" }}>{error}</span>
          <br />
          <br />
          <Button variant="warning" type="submit">
            Submit
          </Button>
          <span style={{ marginLeft: "5px" }}>
            if you have an account?{" "}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "blue",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Login Here
              <HiOutlineArrowUpRight />
            </Link>
          </span>
        </Form>
      </div>
    </>
  );
}

export default Signup;
