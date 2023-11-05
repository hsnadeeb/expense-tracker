// NavbarC.js
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavbarC() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement the logout logic here
    // For example, clearing user data from localStorage or making an API call
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/signup">Signup</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarC;
