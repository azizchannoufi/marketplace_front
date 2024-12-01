import React, { useState } from 'react';
import ProductCard from '../Home/components/ProductCard';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Shop({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const categories = [
    {
      name: 'All',
      subCategories: [],
    },
    {
      name: 'Parfum Homme',
      subCategories: ['Sport', 'Casual', 'Luxury'],
    },
    {
      name: 'Parfum Femme',
      subCategories: ['Floral', 'Fruity', 'Oriental'],
    },
    {
      name: 'Parfum Enfant',
      subCategories: ['Sweet', 'Gentle'],
    },
  ];

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.categorie === selectedCategory;
    const matchesSubCategory =
      selectedSubCategories.length === 0 ||
      selectedSubCategories.includes(product.sousCategorie);
    return matchesSearch && matchesCategory && matchesSubCategory;
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
                  key={category.name}
                  className={`list-group-item ${selectedCategory === category.name ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSelectedSubCategories([]); // Reset subcategories when changing category
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {category.name}
                </li>
              ))}
            </ul>

            {/* Subcategories */}
            {selectedCategory !== 'All' && (
              <div className="mt-3">
                <h6>Subcategories</h6>
                {categories
                  .find((category) => category.name === selectedCategory)
                  .subCategories.map((subCategory) => (
                    <div key={subCategory} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={subCategory}
                        checked={selectedSubCategories.includes(subCategory)}
                        onChange={() => handleSubCategoryChange(subCategory)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={subCategory}
                      >
                        {subCategory}
                      </label>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Product List */}
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
                <p>No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
