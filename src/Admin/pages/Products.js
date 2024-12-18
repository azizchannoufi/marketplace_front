import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Modal for editing product
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [newProduct, setNewProduct] = useState({
    titre: '',
    prix: '',
    description: '',
    old_prix: '', // Add old price field
    idCategorie: '',
    image: '',
    stock:null
  });

  const [editProduct, setEditProduct] = useState({ // Edit product state
    id: '',
    titre: '',
    prix: '',
    old_prix: '',
    description: '',
    category: '',
    subCategories: [],
    stock:null
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/categories/');
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  // Filter subcategories based on the selected category
  useEffect(() => {
    const selectedCat = categories.find((cat) => cat.nom === selectedCategory);
    setSubCategories(selectedCat ? selectedCat.sousCategories : []);
  }, [selectedCategory, categories]);
  
  // Handle subcategory selection
  const handleSubCategoryCheck = (subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  // Add a new product
  const handleAddProduct = async () => {
    const newArticle = {
      titre: newProduct.titre,
      prix: newProduct.prix,
      old_prix: newProduct.old_prix,
      description: newProduct.description,
      idCategorie: newProduct.idCategorie,
      stock: newProduct.stock,
    };
  
    await CreatArticle(newArticle, imageFile); // Call the function after form submission
    setShowModal(false); // Close the modal
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/articles/adminArticle');
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  };
  const uploadImageToCloudinary = async (file,articleId) => {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64Image = reader.result;
            const response = await axios.post(
              "http://localhost:3002/api/articles/upload",
              { 
                articleId:articleId,
                file: base64Image }
            );

            if (response.status === 201) {
              resolve(response.data.url); // Retourne l'URL de l'image
            } else {
              reject("Échec de l'upload de l'image.");
            }
          } catch (error) {
            reject(error.message);
          }
        };

        reader.onerror = () => {
          reject("Erreur lors de la conversion de l'image en base64.");
        };

        reader.readAsDataURL(file); // Convertir l'image en base64
      });
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image :", error);
      throw new Error("Échec de l'upload de l'image.");
    }
  };
  const CreatArticle = async (infoArticle, imageFile) => {
    try {
      // Création de l'article
      const response = await axios.post(
        "http://localhost:3002/api/articles",
        infoArticle
      );
  
      if (response.status === 201 || response.status === 200) {
        const articleId = response.data.id;
  
        if (imageFile) {
          await uploadImageToCloudinary(imageFile,articleId)
        } else {
          alert("Article créé sans image.");
          getAllProducts(); 
        }
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'article :", error);
      alert("La création de l'article a échoué.");
    }
  };

  
  // Handle edit product click
  const handleEditProduct = (product) => {
    setEditProduct({
      id: product.id,
      titre: product.titre,
      prix: product.prix,
      old_prix: product.old_prix,
      description: product.description,
      category: product.category,
      subCategories: product.subCategories || [],
      image: product.image,
    });
    setShowEditModal(true);
  };

  // Update product
  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('titre', editProduct.titre);
      formData.append('prix', editProduct.prix);
      formData.append('description', editProduct.description);
      formData.append('old_prix', editProduct.old_prix);
      formData.append('category', editProduct.category);
      formData.append('subCategories', JSON.stringify(editProduct.subCategories));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.put(`http://localhost:3001/api/products/${editProduct.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('Product updated successfully');
        setShowEditModal(false);
        getAllProducts(); // Refresh product list
      }
    } catch (e) {
      console.error('Error updating product:', e);
    }
  };

  useEffect(() => {
    getAllProducts();
    fetchCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Product Management</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Add New Product
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price (€)</th>
            <th>Old Price (€)</th>
            <th>Category</th>
            <th>stock</th>
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
              <td>{parseFloat(product.old_prix).toFixed(2)}</td>
              <td>{product.categorieNom}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditProduct(product)}
                >
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

      {/* Modal for adding new product */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product name"
                value={newProduct.titre}
                onChange={(e) => setNewProduct({ ...newProduct, titre: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={newProduct.prix}
                onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Old Price (€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Old Price"
                value={newProduct.old_prix}
                onChange={(e) => setNewProduct({ ...newProduct, old_prix: e.target.value })}
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
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newProduct.idCategorie || ''}
                onChange={(e) => {
                  const selectedCat = categories.find(cat => cat.id === parseInt(e.target.value));
                  if (selectedCat) {
                    setNewProduct({ ...newProduct, idCategorie: e.target.value });
                    setSelectedCategory(selectedCat.nom);  // Update the category
                  }
                }}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing product */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={editProduct.titre}
                onChange={(e) => setEditProduct({ ...editProduct, titre: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (€)</Form.Label>
              <Form.Control
                type="number"
                value={editProduct.prix}
                onChange={(e) => setEditProduct({ ...editProduct, prix: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Old Price (€)</Form.Label>
              <Form.Control
                type="number"
                value={editProduct.old_prix}
                onChange={(e) => setEditProduct({ ...editProduct, old_prix: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={editProduct.category}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.nom}>
                    {category.nom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={editProduct.stock}
                onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subcategories</Form.Label>
              <div>
                {subCategories.map((subCategory) => (
                  <Form.Check
                    key={subCategory}
                    type="checkbox"
                    label={subCategory}
                    checked={editProduct.subCategories.includes(subCategory)}
                    onChange={() => handleSubCategoryCheck(subCategory)}
                  />
                ))}
              </div>
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateProduct}>
              Update Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
