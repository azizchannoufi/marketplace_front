import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

// Exemple de produit
const productData = [
  {
    id: 1,
    title: 'Produit 1',
    image: 'https://via.placeholder.com/150',
    price: '$20.00',
  },
  {
    id: 2,
    title: 'Produit 2',
    image: 'https://via.placeholder.com/150',
    price: '$25.00',
  },
  {
    id: 3,
    title: 'Produit 3',
    image: 'https://via.placeholder.com/150',
    price: '$30.00',
  },
  {
    id: 4,
    title: 'Produit 4',
    image: 'https://via.placeholder.com/150',
    price: '$40.00',
  },
  {
    id: 5,
    title: 'Produit 5',
    image: 'https://via.placeholder.com/150',
    price: '$35.00',
  },
  {
    id: 6,
    title: 'Produit 6',
    image: 'https://via.placeholder.com/150',
    price: '$50.00',
  },
];

export default function LikedPage() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // Simule le chargement des produits aimés (vous pouvez récupérer ces produits depuis un API ou un localStorage)
  useEffect(() => {
    // Exemple de produits aimés (ici, simplement une liste d'ID)
    const likedProductIds = [1, 3, 5]; // L'ID des produits que l'utilisateur a aimés (simulé ici)
    const liked = productData.filter(product => likedProductIds.includes(product.id));
    setLikedProducts(liked);
  }, []);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Afficher plus de produits
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
        <Navbar />
        <div style={styles.container}>
          <h2 style={styles.title}>Produits Aimés</h2>

          <div style={styles.productList}>
            {likedProducts.slice(0, showMore ? likedProducts.length : 4).map(product => (
              <div key={product.id} style={styles.productCard}>
                <img src={product.image} alt={product.title} style={styles.productImage} />
                <h3 style={styles.productTitle}>{product.title}</h3>
                <p style={styles.productPrice}>{product.price}</p>
                <button onClick={() => addToCart(product)} style={styles.addButton}>Ajouter au panier</button>
              </div>
            ))}
          </div>

          <button onClick={toggleShowMore} style={styles.showMoreButton}>
            {showMore ? 'Voir moins' : 'Voir plus'}
          </button>
        </div>
        <Footer />
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '250px',
    transition: 'transform 0.2s ease',
    height: '350px',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  productTitle: {
    fontSize: '18px',
    marginTop: '10px',
  },
  productPrice: {
    fontSize: '16px',
    color: '#888',
  },
  addButton: {
    backgroundColor: '#FF5733',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  addButtonHovered: {
    backgroundColor: '#FF4500',
  },
  showMoreButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
