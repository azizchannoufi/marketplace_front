import React, { useState, useEffect } from 'react';
import ProductCard from '../Home/components/ProductCard';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';

function SalePage({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onSaleProducts, setOnSaleProducts] = useState([]);

  const categories = ['all', 'Parfum Homme', 'Parfum Femme', 'Parfum Enfant'];

  // Filtrage des produits en solde
  useEffect(() => {
    // Simuler une récupération de produits en solde depuis une API
    const saleProducts = products.filter((product) => product.onSale); // Supposons que 'onSale' est un champ boolean
    setOnSaleProducts(saleProducts);
  }, [products]);

  // Filtrer les produits en fonction de la recherche et de la catégorie
  const filteredProducts = onSaleProducts.filter((product) => {
    const matchesSearch = product.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          {/* Filter Sidebar */}
          <div className="col-md-3">
            <h5>Filter by Category</h5>
            <ul className="list-group">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`list-group-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  style={{ cursor: 'pointer' }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
              ))}
            </ul>
          </div>

          {/* Products Area */}
          <div className="col-md-9">
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col-md-4 mb-4" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p>No products found on sale.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SalePage;
