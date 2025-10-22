import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdPerson } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      setUser(parsedUser);
    }
  }, []);
  const logoutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#081d32ff" }}>
      <Container fluid>
        <Navbar.Brand href="#home" style={{ color: "#fff" }}>
          🔷 Joblly CRM
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto" style={{ display: "flex" }}>
            <Dropdown>
              <Dropdown.Toggle style={{ background: "none", border: "none" }}>
                <MdPerson size={24} color="#fff" />
                {user?.username || "Guest"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/crm/view-profile">
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutUser}>LogOut</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
