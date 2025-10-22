import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  MdDashboard,
  MdHome,
  MdPerson,
  MdGroup,
  MdChecklist,
} from "react-icons/md";
export default function sidebar() {
  return (
    <div>
      <aside
        style={{ backgroundColor: "#343a40", width: "250px", height: "100vh" }}
      >
        <Nav
          defaultActiveKey="/"
          className="flex-column"
          style={{ paddingTop: "30px" }}
        >
          <Nav.Link style={{ color: "#fff", backgroundColor: "#333" }}>
            <MdDashboard size={24} color="#fff" />
            Dashboard
          </Nav.Link>
          <Nav.Link href="/" style={{ color: "#fff" }}>
            <MdHome size={24} color="#fff" />
            Home
          </Nav.Link>
          <Nav.Link
            href="/customer"
            eventKey="link-1"
            style={{ color: "#fff" }}
          >
            <MdGroup size={24} color="#fff" />
            Customers
          </Nav.Link>

          <Nav.Link href="/user" eventKey="link-2" style={{ color: "#fff" }}>
            <MdGroup size={24} color="#fff" />
            Users
          </Nav.Link>
          <Nav.Link eventKey="link-2" style={{ color: "#fff" }}>
            <MdChecklist size={24} color="#fff" />
            Task
          </Nav.Link>
        </Nav>
      </aside>
    </div>
  );
}
