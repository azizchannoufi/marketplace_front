import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importer les icônes

const SaleProducts = () => {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  const getAllProduct = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Définit la distance de défilement
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div style={styles.container}>
      {/* <h2 style={styles.sectionTitle}>Featured Products</h2> */}
      <div style={styles.scrollWrapper}>
        {/* Utilisation des icônes de react-icons */}
        <button style={styles.scrollButton} onClick={scrollLeft}>
          <FaArrowLeft />
        </button>
        <div style={styles.scrollContainer} ref={scrollContainerRef}>
          {products.map((product) => (
            <div style={styles.productCard} key={product.id}>
              <img
                src={product.image}
                alt={product.titre}
                style={styles.productImage}
              />
              <div style={styles.productInfo}>
                <p style={styles.productPrice}>
                  <span style={styles.salePrice}>$200</span>{' '}
                  <span style={styles.originalPrice}>${product.prix}</span>
                </p>
                <p style={styles.productName}>{product.name}</p>
              </div>
            </div>
          ))}
        </div>
        <button style={styles.scrollButton} onClick={scrollRight}>
          <FaArrowRight />
        </button>
      </div>
      <button style={styles.viewAllButton}>View All</button>
    </div>
  );
};

// Styles en ligne
const styles = {
  container: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f8f5f0', // Fond de la section
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#8a2b46',
    marginBottom: '20px',
  },
  scrollWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    gap: '20px',
    padding: '10px 0',
    flex: 1, // Prend tout l'espace disponible
    // Styles pour masquer la barre de défilement
    scrollbarWidth: 'none', // Pour Firefox
  },
  productCard: {
    flex: '0 0 auto',
    width: '200px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: 'auto',
  },
  productInfo: {
    padding: '10px',
  },
  productPrice: {
    fontSize: '16px',
    margin: '0',
  },
  salePrice: {
    color: '#e63946',
    fontWeight: 'bold',
  },
  originalPrice: {
    color: '#888',
    textDecoration: 'line-through',
    fontSize: '14px',
    marginLeft: '5px',
  },
  productName: {
    fontSize: '14px',
    color: '#333',
    margin: '5px 0 0',
  },
  viewAllButton: {
    display: 'block',
    margin: '20px auto 0',
    padding: '10px 20px',
    backgroundColor: '#8a2b46',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  viewAllButtonHover: {
    backgroundColor: '#7a263e',
  },
  scrollButton: {
    backgroundColor: 'transparent', // Pas de fond
    color: '#8a2b46', // Couleur des flèches
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '10px', // Ajout d'un padding pour agrandir la zone cliquable
    transition: 'color 0.3s ease', // Transition douce pour la couleur
  },
};

export default SaleProducts;
