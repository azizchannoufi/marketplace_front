// components/TopNavbar.js
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const TopNavbar = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">E-commerce Admin</Navbar.Brand>
    </Container>
  </Navbar>
);

export default TopNavbar;
