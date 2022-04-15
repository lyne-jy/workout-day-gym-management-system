import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/shopping">
            <img src="/gym-logo.svg" height="60" width="60"></img> Workout Day
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/shopping">Shopping</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/fitnessProfiles">My Profile</Nav.Link>
            <Nav.Link href="/appointments">My Appointments</Nav.Link>
            <Nav.Link href="/login"> Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
