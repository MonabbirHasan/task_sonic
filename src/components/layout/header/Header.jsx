import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.css";
import { Form, Button as RBButton } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className="">
        <Container>
          <Navbar.Brand>
            <img style={{ width: 60, height: 50 }} src="/task_sonic.png" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <NavLink to="/post_task">post a task</NavLink>
              <NavLink to="/tasks">browse task</NavLink>
              <NavLink>how it work</NavLink>
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Movingly</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex gap-3">
              <RBButton className="auth_btn">Login</RBButton>
              <RBButton className="auth_btn">Sing up</RBButton>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const styles = {};

export default Header;
