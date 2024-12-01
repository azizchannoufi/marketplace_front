import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [subCategories, setSubCategories] = useState([]); // Sous-catégories filtrées
  const [selectedCategory, setSelectedCategory] = useState(''); // Catégorie sélectionnée
  const [selectedSubCategories, setSelectedSubCategories] = useState([]); // Sous-catégories sélectionnées
  const [imageFile, setImageFile] = useState(null);
  const [newProduct, setNewProduct] = useState({
    titre: '',
    prix: '',
    description: '',
  });

  // Récupérer toutes les catégories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/categories');
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  // Filtrer les sous-catégories en fonction de la catégorie sélectionnée
  useEffect(() => {
    const selectedCat = categories.find((cat) => cat.name === selectedCategory);
    setSubCategories(selectedCat ? selectedCat.subCategories : []);
  }, [selectedCategory, categories]);

  // Ajouter un nouveau produit
  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('titre', newProduct.titre);
      formData.append('prix', newProduct.prix);
      formData.append('description', newProduct.description);
      formData.append('category', selectedCategory);
      formData.append('subCategories', JSON.stringify(selectedSubCategories));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.post('http://localhost:3001/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('Produit ajouté avec succès');
        setShowModal(false);
        getAllProducts(); // Rafraîchir la liste des produits
      }
    } catch (e) {
      console.error('Error adding product:', e);
    }
  };

  // Récupérer tous les produits
  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  };

  useEffect(() => {
    getAllProducts();
    fetchCategories();
  }, []);

  // Gérer la sélection de sous-catégories
  const handleSubCategoryCheck = (subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  return (
    <div className="container mt-4">
      <h2>Gestion des Produits</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Ajouter un Nouveau Produit
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Nom du Produit</th>
            <th>Prix (€)</th>
            <th>Catégorie</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.titre}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </td>
              <td>{product.titre}</td>
              <td>{parseFloat(product.prix).toFixed(2)}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour Ajouter un Nouveau Produit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Nouveau Produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom du Produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom du produit"
                value={newProduct.titre}
                onChange={(e) => setNewProduct({ ...newProduct, titre: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Prix"
                value={newProduct.prix}
                onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {subCategories.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Sous-Catégories</Form.Label>
                {subCategories.map((subCategory) => (
                  <Form.Check
                    key={subCategory}
                    type="checkbox"
                    label={subCategory}
                    checked={selectedSubCategories.includes(subCategory)}
                    onChange={() => handleSubCategoryCheck(subCategory)}
                  />
                ))}
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
