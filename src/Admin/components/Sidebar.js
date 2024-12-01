// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = () => (
  <Nav className="flex-column bg-light p-3" style={{ height: '100vh' }}>
    <h4 className="mb-4">Admin Dashboard</h4>
    <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link> {/* Ajustement pour la route de base */}
    <Nav.Link as={Link} to="/admin/products">Products</Nav.Link> {/* Route complète vers products */}
    <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link> {/* Route complète vers orders */}
    <Nav.Link as={Link} to="/admin/categories">Categories</Nav.Link> {/* Route complète vers customers */}
    <Nav.Link as={Link} to="/admin/evenements">Evenements</Nav.Link> {/* Route complète vers customers */}
    <Nav.Link as={Link} to="/admin/packs">Packs</Nav.Link> {/* Route complète vers customers */}
    <Nav.Link as={Link} to="/admin/remise">Remise</Nav.Link> {/* Route complète vers customers */}
    <Nav.Link as={Link} to="/admin/customers">Customers</Nav.Link> {/* Route complète vers customers */}
  </Nav>
);

export default Sidebar;
