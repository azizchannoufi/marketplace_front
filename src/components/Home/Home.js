import React from 'react';
import Navbar from '../Navbar';
import ProductList from './components/ProductList';
import Footer from '../Footer';
import FeaturedProduct from './components/FeaturedProduct';
import SaleProducts from './components/SaleProducts';
import PacksPage from './components/PackPage';
import ImageList from './components/ImageList'

function Home() {
  return (
    <div>
      <Navbar />
      <FeaturedProduct />
      
      <div className="container mt-5">
        {/* <h2 className="text-center mb-4">Shop The Latest</h2> */}
        {/* Séparation décorative */}
        <div style={styles.separator}>
          <div style={styles.line}></div>
          <div style={styles.textWrapper}>
            <span style={styles.separatorText}>Our Products</span>
          </div>
          <div style={styles.line}></div>
        </div>
        <ProductList />
        <div style={styles.buttonContainer}>
    <button style={styles.viewAllButton}>Voir tout</button>
  </div>
        {/* Séparation décorative */}
        <div style={styles.separator}>
          <div style={styles.line}></div>
          <div style={styles.textWrapper}>
            <span style={styles.separatorText}>Our Exclusive Packs</span>
          </div>
          <div style={styles.line}></div>
        </div>
        <PacksPage />
        {/* Séparation décorative */}
        <div style={styles.separator}>
          <div style={styles.line}></div>
          <div style={styles.textWrapper}>
            <span style={styles.separatorText}>Our Exclusive Deals</span>
          </div>
          <div style={styles.line}></div>
        </div>
        <div style={{marginBottom:"10%"}} >
        <SaleProducts />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// Styles en ligne
const styles = {
  separator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '40px 0',
    position: 'relative',
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#ccc',
  },
  textWrapper: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: '0 10px',
  },
  separatorText: {
    fontSize: '18px',
    color: '#8a2b46',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  viewAllButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#8a2b46',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  viewAllButtonHover: {
    backgroundColor: '#a33d59', // Couleur plus claire au survol
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
};

export default Home;
