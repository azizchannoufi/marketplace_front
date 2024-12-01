import React from 'react';

function PacksPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Featured Packs</h1>
      <div style={styles.packsContainer}>
        {/* Pack 1 */}
        <div style={styles.packCard}>
          <img
            src="https://via.placeholder.com/300x400"
            alt="Pack 1"
            style={styles.image}
          />
          <div style={styles.overlay}>
            <p style={styles.subtitle}>MUST SEE NEW STYLE</p>
            <h2 style={styles.title}>Birthday Collection</h2>
            <button style={styles.button}>Shop Now</button>
          </div>
        </div>
        {/* Pack 2 */}
        <div style={styles.packCard}>
          <img
            src="https://via.placeholder.com/300x400"
            alt="Pack 2"
            style={styles.image}
          />
          <div style={styles.overlay}>
            <p style={styles.subtitle}>NEW COLLECTION</p>
            <h2 style={styles.title}>Summer Essentials</h2>
            <button style={styles.button}>Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles en ligne
const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  header: {
    fontSize: '36px',
    color: '#80002a',
    marginBottom: '30px',
  },
  packsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  },
  packCard: {
    position: 'relative',
    width: '300px',
    height: '400px',
    overflow: 'hidden',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: '#fff',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px 10px 0 0',
  },
  subtitle: {
    fontSize: '12px',
    color: '#80002a',
    textTransform: 'uppercase',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#80002a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    fontSize: '12px',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
};

export default PacksPage;
