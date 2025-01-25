import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Form } from "react-bootstrap";
import "./header.css";
const Header = () => {
  const navigation = useNavigate();
  return (
    <header>
      <ToastContainer />
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand
            className="header_brand"
            onClick={() => navigation("/")}
          >
            <img style={{ width: 60, height: 50 }} src="/task_sonic.png" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <NavLink to="/post_task">post a task</NavLink>
              <NavLink to="/tasks">browse task</NavLink>
              <Nav.Link href="/#home_task_steps">how it work</Nav.Link>
            </Nav>
            <div className="d-flex gap-3">
              <button className="auth_btn" onClick={() => navigation("/login")}>
                Login
              </button>
              <button
                className="auth_btn"
                onClick={() => navigation("/register")}
              >
                Sing up
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const styles = {};

export default Header;
