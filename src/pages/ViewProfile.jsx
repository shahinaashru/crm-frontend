import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ViewProfile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      setUser(parsedUser);
    }
  }, []);
  if (!user) {
    return <p>Loading profile...</p>; // or show "User not logged in"
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            style={{ padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <Row>
              {/* <Col md={4} className="text-center">
                <img
                  src={user.profileImage || "https://via.placeholder.com/150"}
                  alt="Profile"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Col> */}
              <Col md={8}>
                <h3>{user.username}</h3>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Conatct Number:</strong> {user.phone_number}
                </p>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
                <Link
                  to={`/crm/edit-user/${user._id}/${encodeURIComponent(
                    user.username
                  )}`}
                >
                  <Button variant="primary">Edit Profile</Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewProfile;
