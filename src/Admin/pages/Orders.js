import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      client: 'Client A',
      total: 150,
      status: 'Livré',
      products: [
        { id: 101, name: 'Produit 1', quantity: 2, price: 50 },
        { id: 102, name: 'Produit 2', quantity: 1, price: 50 },
      ],
    },
    {
      id: 2,
      client: 'Client B',
      total: 75,
      status: 'En cours',
      products: [
        { id: 103, name: 'Produit 3', quantity: 3, price: 25 },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Afficher les détails de la commande
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Annuler une commande
  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: 'Annulé' } : order
    );
    setOrders(updatedOrders);
    alert(`Commande ${orderId} annulée.`);
  };

  return (
    <div className="container mt-4">
      <h2>Gestion des Commandes</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Client</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>€{order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleViewDetails(order)}
                >
                  Voir
                </Button>
                {order.status !== 'Annulé' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Annuler
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour afficher les détails de la commande */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de la Commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <>
              <h5>Client : {selectedOrder.client}</h5>
              <h6>Total : €{selectedOrder.total.toFixed(2)}</h6>
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>ID Produit</th>
                    <th>Nom</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire (€)</th>
                    <th>Total (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price.toFixed(2)}</td>
                      <td>{(product.quantity * product.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p>Aucune commande sélectionnée.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
