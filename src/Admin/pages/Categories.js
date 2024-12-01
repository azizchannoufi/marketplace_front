import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Categories = () => {
  // États pour gérer les catégories et le formulaire d'ajout
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Électronique',
      description: 'Produits électroniques divers',
      subCategories: ['Smartphones', 'Laptops', 'Accessoires']
    },
    {
      id: 2,
      name: 'Vêtements',
      description: 'Vêtements pour hommes et femmes',
      subCategories: ['Hommes', 'Femmes', 'Enfants']
    }
  ]);

  const [showModal, setShowModal] = useState(false); // Afficher le modal d'ajout
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    subCategories: []
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Fonction pour ajouter une nouvelle catégorie
  const handleAddCategory = () => {
    setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
    handleCloseModal(); // Fermer le modal après l'ajout
  };

  return (
    <div>
      <h2>Gestion des Catégories</h2>
      {/* Table des catégories */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Catégorie</th>
            <th>Nom de la Catégorie</th>
            <th>Description</th>
            <th>Sous-catégories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <ul>
                  {category.subCategories.map((subCategory, index) => (
                    <li key={index}>{subCategory}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Button variant="warning" size="sm">Modifier</Button> 
                <Button variant="danger" size="sm" className="ml-2">Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Bouton pour ajouter une nouvelle catégorie */}
      <Button variant="primary" onClick={handleShowModal}>Ajouter une Catégorie</Button>

      {/* Modal pour ajouter une catégorie */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Nouvelle Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryName">
              <Form.Label>Nom de la Catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de la catégorie"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="categoryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description de la catégorie"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="subCategories">
              <Form.Label>Sous-catégories (séparées par des virgules)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Smartphones, Laptops"
                value={newCategory.subCategories.join(', ')}
                onChange={(e) => {
                  const subCategories = e.target.value.split(',').map(sub => sub.trim());
                  setNewCategory({ ...newCategory, subCategories });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;
