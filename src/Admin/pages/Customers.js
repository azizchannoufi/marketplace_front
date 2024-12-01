import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  // Simuler la récupération des données des clients
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/customers');
        if (response.status === 200) {
          setCustomers(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des clients :', error);
      }
    };
    fetchCustomers();
  }, []);

  // Gérer la sélection des clients
  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerId)
        ? prevSelected.filter((id) => id !== customerId)
        : [...prevSelected, customerId]
    );
  };

  // Envoyer l'e-mail
  const handleSendEmail = () => {
    const recipients =
      selectedCustomers.length > 0
        ? customers.filter((customer) =>
            selectedCustomers.includes(customer.id)
          )
        : customers;

    console.log('Envoi d\'e-mails à :', recipients.map((c) => c.email));
    console.log('Contenu de l\'e-mail :', emailContent);

    // Logique d'envoi d'e-mail via une API (à implémenter)
    // axios.post('/api/send-email', { recipients, content: emailContent });

    setShowEmailModal(false);
    alert('E-mail envoyé avec succès !');
  };

  return (
    <div className="container mt-4">
      <h2>Gestion des Clients</h2>
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowEmailModal(true)}
      >
        Envoyer un e-mail
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={(e) =>
                  setSelectedCustomers(
                    e.target.checked ? customers.map((c) => c.id) : []
                  )
                }
              />
            </th>
            <th>ID Client</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Commandes</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => handleCheckboxChange(customer.id)}
                />
              </td>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.ordersCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour l'envoi d'e-mails */}
      <Modal
        show={showEmailModal}
        onHide={() => setShowEmailModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Envoyer un e-mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="emailContent">
              <Form.Label>Contenu de l'e-mail :</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Écrivez votre message ici..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSendEmail}>
            Envoyer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customers;
