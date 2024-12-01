import React, { useState } from 'react';
import { Table, Button, Modal, Form, Col, Image } from 'react-bootstrap';
import axios from 'axios';

const Evenements = () => {
  const [evenements, setEvenements] = useState([
    {
      id: 1,
      name: 'Concert de Jazz',
      date: '10 Décembre 2024',
      location: 'Paris',
      status: true,
      image: 'https://example.com/jazz-concert.jpg',
      products: ['Produit 1', 'Produit 2'],
      discount: 20 // Remise en pourcentage
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    status: false,
    image: '',
    products: [],
    discount: 0
  });

  const [showProductModal, setShowProductModal] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  // Liste des produits disponibles
  const availableProducts = [
    { id: 1, name: 'Produit 1' },
    { id: 2, name: 'Produit 2' },
    { id: 3, name: 'Produit 3' },
    { id: 4, name: 'Produit 4' }
  ];
  ////////////////////////////////////////////////////////API///////////////////////////////////////////////////////////////////

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowProductModal = () => setShowProductModal(true);
  const handleCloseProductModal = () => setShowProductModal(false);

  const handleAddEvent = () => {
    setEvenements([...evenements, { ...newEvent, id: evenements.length + 1, image: imagePreview }]);
    handleCloseModal();
  };

  const handleDeleteEvent = (id) => {
    setEvenements(evenements.filter(event => event.id !== id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleToggleProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <div>
      <h2>Gestion des Événements</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Événement</th>
            <th>Nom de l'Événement</th>
            <th>Date</th>
            <th>Lieu</th>
            <th>Status</th>
            <th>Produits Associés</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {evenements.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>{event.status ? 'Visible' : 'Invisible'}</td>
              <td>{event.products.map((id) => availableProducts.find((p) => p.id === id)?.name).join(', ')}</td>
              <td>
                <Button variant="warning" size="sm">Modifier</Button> 
                <Button variant="danger" size="sm" className="ml-2" onClick={() => handleDeleteEvent(event.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShowModal}>Ajouter un Événement</Button>

      {/* Modal pour ajouter un événement */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Nouvel Événement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventName">
              <Form.Label>Nom de l'Événement</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de l'événement"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="eventDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="eventLocation">
              <Form.Label>Lieu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lieu de l'événement"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group controlId="eventImage">
              <Form.Label>Image de l'Événement</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>
            {imagePreview && (
              <Image src={imagePreview} alt="Prévisualisation de l'image" fluid className="mt-3" />
            )}

            <Form.Group controlId="eventDiscount">
              <Form.Label>Remise (%)</Form.Label>
              <Form.Control
                type="number"
                value={newEvent.discount}
                onChange={(e) => setNewEvent({ ...newEvent, discount: e.target.value })}
              />
            </Form.Group>

            <Button variant="secondary" onClick={handleShowProductModal}>
              Ajouter des Produits
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setNewEvent({ ...newEvent, products: selectedProducts });
              handleAddEvent();
            }}
          >
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour choisir des produits */}
      <Modal show={showProductModal} onHide={handleCloseProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter des Produits à l'Événement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {availableProducts.map((product) => (
              <Form.Check
                key={product.id}
                type="checkbox"
                label={product.name}
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleToggleProduct(product.id)}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProductModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleCloseProductModal}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Evenements;
