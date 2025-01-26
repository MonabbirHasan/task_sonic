import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./header.css";
const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
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
            <h2 className="header_brand_name">task sonic</h2>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-light"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <NavLink to="/post_task">post a task</NavLink>
              <NavLink to="/tasks">browse task</NavLink>
              <NavLink href="#home_task_steps">how it work</NavLink>
            </Nav>
            <div className="d-flex gap-3 ">
              {isAuthenticated ? (
                <button className="auth_btn" onClick={() => logout()}>
                  logout
                </button>
              ) : (
                <button
                  className="auth_btn"
                  onClick={() => navigation("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const styles = {};

export default Header;
