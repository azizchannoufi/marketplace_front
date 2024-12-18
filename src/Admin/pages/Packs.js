import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Packs = () => {

  const [load, setLoad] = useState(false);
  const [packs, setPacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPack, setNewPack] = useState({
    name: '',
    description: '',
    products: [],
    totalPrice: ''
  });
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  ////////////////////////////API///////////////////////////////////////////

  const GetPack = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/pack/');
      if (response.status === 200) {
        setPacks(response.data);
      }
    } catch (e) {
      console.log('Error in GetPack:', e);
    }
  };

  const GetCateg = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/categories/');
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  const GetArticlebyCateg = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3002/api/articles/artcateg/${id}`);
      if (response.status === 200) {
        setArticles(response.data);
      }
    } catch (e) {
      console.error('Error fetching articles:', e);
    }
  };

  const AddNewPack = async (info) => {
    try {
      const response = await axios.post("http://localhost:3002/api/pack/", info);
      if (response.status === 201) {
        setLoad(!load); // Refresh the pack list after adding
        handleCloseModal(); // Close the modal
        setNewPack({ name: '', description: '', products: [], totalPrice: '' }); // Reset form
        setSelectedProducts([]); // Reset selected products
      }
    } catch (e) {
      console.log('Error in AddNewPack:', e);
    }
  };

  useEffect(() => {
    GetCateg();
    GetPack();
  }, [load]);

  ////////////////////////////API///////////////////////////////////////////

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddPack = async () => {
    // Prepare selected products in the expected format
    const selectedProductsDetails = selectedProducts.map((productId) => {
      const product = articles.find((product) => product.id === productId);
      return { id: product.id, nom: product.titre };
    });

    // Create the object to send
    const info = {
      titre: newPack.name,
      description: newPack.description,
      prix: parseFloat(newPack.totalPrice), // Ensure the price is a number
      articles: selectedProductsDetails
    };

    // Call the AddNewPack function to send the data
    AddNewPack(info);
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

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Fetch articles for the selected category
    GetArticlebyCateg(categoryId);
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
          {packs.map((pack, index) => (
            <tr key={pack.id}>
              <td>{index + 1}</td>
              <td>{pack.titre}</td>
              <td>{pack.description}</td>
              <td>{pack.articles.map((p) => p.nom).join(', ')}</td>
              <td>{pack.prix}</td>
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

            <Form.Group controlId="packCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory || ''}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nom}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Affichage des produits de la catégorie sélectionnée */}
            {selectedCategory && articles.length > 0 && (
              <Form.Group>
                <Form.Label>Produits de la catégorie</Form.Label>
                <div>
                  {articles.map((product) => (
                    <Form.Check
                      key={product.id}
                      type="checkbox"
                      label={product.titre}
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleToggleProduct(product.id)}
                    />
                  ))}
                </div>
              </Form.Group>
            )}

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
