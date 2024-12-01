import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const Categories = () => {
  // États pour gérer les catégories et le formulaire d'ajout
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const [showModal, setShowModal] = useState(false); // Afficher le modal d'ajout
  const [newCategory, setNewCategory] = useState({
    id: null,
    nom: '',
    sousCategories: []
  });

  ////////////////////////////////////////////////////////API///////////////////////////////////////////////////////////////////
  const addCategory = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/categories/', newCategory);
      if (response.status === 201) {
        setShowModal(false);
        setNewCategory({ nom: '', sousCategories: [] });
        alert("Catégorie ajoutée");
        setLoad(!load);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/categories/');
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editCategory = async () => {
    try {
      const response = await axios.put(`http://localhost:3002/api/categories/${newCategory.id}`, newCategory);
      if (response.status === 200) {
        setShowModal(false);
        setLoad(!load); // Rafraîchir les catégories
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/api/categories/${id}`);
      if (response.status === 200) {
        setLoad(!load); // Rafraîchir les catégories
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategory(); // Charge les catégories lors du chargement du composant ou lorsque "load" change
  }, [load]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleShowModal = (category = null) => {
    if (category) {
      // Si une catégorie est passée, on remplit le modal avec ses données
      setNewCategory(category);
    } else {
      setNewCategory({ nom: '', sousCategories: [] }); // Réinitialiser pour l'ajout d'une nouvelle catégorie
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Fonction pour ajouter une nouvelle catégorie
  const handleAddCategory = () => {
    if (newCategory.id) {
      editCategory(); // Si un ID est présent, on édite la catégorie
    } else {
      addCategory(); // Sinon, on ajoute une nouvelle catégorie
    }
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
            <th>Sous-catégories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category,index) => (
            <tr key={category.id}>
              <td>{index+1}</td>
              <td>{category.nom}</td>
              <td>
                <ul>
                  {category.sousCategories.map((subCategory, index) => (
                    <li key={index}>{subCategory}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(category)}>Modifier</Button>
                <Button variant="danger" size="sm" className="ml-2" onClick={() => deleteCategory(category.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Bouton pour ajouter une nouvelle catégorie */}
      <Button variant="primary" onClick={() => handleShowModal()}>Ajouter une Catégorie</Button>

      {/* Modal pour ajouter ou modifier une catégorie */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{newCategory.id ? 'Modifier' : 'Ajouter'} une Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryNom">
              <Form.Label>Nom de la Catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de la catégorie"
                value={newCategory.nom}
                onChange={(e) => setNewCategory({ ...newCategory, nom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="sousCategories">
              <Form.Label>Sous-catégories (séparées par des virgules)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Smartphones, Laptops"
                value={newCategory.sousCategories.join(', ')}
                onChange={(e) => {
                  const sousCategories = e.target.value.split(',').map(sub => sub.trim());
                  setNewCategory({ ...newCategory, sousCategories });
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
            {newCategory.id ? 'Confirmer' : 'Ajouter'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;
