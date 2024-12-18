import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios'
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/commandes/admin');
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error);
    }
  };

  useEffect(()=>{
    fetchOrders()
  },[])

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
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
  }

  return (
    <div className="container mt-4">
      <h2>Gestion des Commandes</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Date</th>
            <th>Client</th>
            <th>Total</th>
            <th>Mode De Payement</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{formatDate(order.dateCommande)}</td>
              <td>{order.fullname}</td>
              <td>€{order.total.toFixed(2)}</td>
              <td>{order.modePayment}</td>
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
              <h6>Date : {selectedOrder.date}</h6>
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
