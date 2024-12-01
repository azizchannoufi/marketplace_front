import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Packs = () => {
  const [packs, setPacks] = useState([
    {
      id: 1,
      name: 'Pack Famille',
      description: 'Pack de produits pour toute la famille',
      products: [{ id: 1, name: 'Produit 1' }, { id: 2, name: 'Produit 2' }],
      totalPrice: 100
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newPack, setNewPack] = useState({
    name: '',
    description: '',
    products: [],
    totalPrice: ''
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  // Liste des produits disponibles
  const availableProducts = [
    { id: 1, name: 'Produit 1' },
    { id: 2, name: 'Produit 2' },
    { id: 3, name: 'Produit 3' },
    { id: 4, name: 'Produit 4' }
  ];

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddPack = () => {
    setPacks([
      ...packs,
      {
        ...newPack,
        id: packs.length + 1,
        products: selectedProducts.map((productId) => availableProducts.find((product) => product.id === productId))
      }
    ]);
    handleCloseModal();
    setNewPack({ name: '', description: '', products: [], totalPrice: '' });
    setSelectedProducts([]);
  };

  const handleDeletePack = (id) => {
    setPacks(packs.filter((pack) => pack.id !== id));
  };

  const handleToggleProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <div>
      <h2>Gestion des Packs</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Pack</th>
            <th>Nom du Pack</th>
            <th>Description</th>
            <th>Produits Associés</th>
            <th>Prix Total (€)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packs.map((pack) => (
            <tr key={pack.id}>
              <td>{pack.id}</td>
              <td>{pack.name}</td>
              <td>{pack.description}</td>
              <td>{pack.products.map((p) => p.name).join(', ')}</td>
              <td>{pack.totalPrice}</td>
              <td>
                <Button variant="warning" size="sm">Modifier</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeletePack(pack.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShowModal}>Ajouter un Pack</Button>

      {/* Modal pour ajouter un pack */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Nouveau Pack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="packName">
              <Form.Label>Nom du Pack</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom du pack"
                value={newPack.name}
                onChange={(e) => setNewPack({ ...newPack, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="packDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description du pack"
                value={newPack.description}
                onChange={(e) => setNewPack({ ...newPack, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Produits</Form.Label>
              <div>
                {availableProducts.map((product) => (
                  <Form.Check
                    key={product.id}
                    type="checkbox"
                    label={product.name}
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleToggleProduct(product.id)}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="packPrice">
              <Form.Label>Prix Total (€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Prix total du pack"
                value={newPack.totalPrice}
                onChange={(e) => setNewPack({ ...newPack, totalPrice: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleAddPack}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Packs;
