import React, { useState } from "react";
import SignupModal from "../modals/SignupModal";
import LoginModal from "../modals/LoginModal";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../context/AuthProvider.js";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

function NewNavbar(props) {
  const [isLoginModal, setLogInModal] = useState(false);
  const [isSignupModal, setSignupModal] = useState(false);

  const handleLogin = () => setLogInModal(!isLoginModal);
  const handleSignup = () => setSignupModal(!isSignupModal);

  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          {" "}
          <Link className="link" to="/" text="light">
            Home
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="link" to="/search">
                Search
              </Link>
            </Nav.Link>
            {auth.user &&<NavDropdown title="My Info" className="link" >
              <NavDropdown.Item>
                <Link className="navbar-link" to="/profile">My Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link className="navbar-link" to="/pets">My Pets</Link>
              </NavDropdown.Item>
            </NavDropdown>}
          </Nav>
          {auth.user?.role==="Admin" &&<NavDropdown title="Admin" className="link">
              <NavDropdown.Item>
                <Link className="navbar-link" to="/addPet">Add Pet</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link className="navbar-link" to="/dashboard">Dashboard</Link>
              </NavDropdown.Item>
            </NavDropdown>}
          <Nav>
            <Nav.Link >{!auth.user && (
          <button className="nav-button" onClick={handleLogin}>
            Login
          </button>
        )}</Nav.Link>
            <Nav.Link eventKey={2} >{!auth.user && (
          <button className="nav-button" onClick={handleSignup}>
            Signup
          </button>
        )} </Nav.Link>
                    <Nav.Link eventKey={2}>{auth.user && (
          <button className="nav-button" onClick={handleLogout}>
            Logout
          </button>
        )} </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {
        <LoginModal
          handleLogin={handleLogin}
          isLoginModal={isLoginModal}
        />
      }
      {
        <SignupModal
          handleSignup={handleSignup}
          isSignupModal={isSignupModal}
        />
      }
    </Navbar>
    
  );
}

export default NewNavbar;
