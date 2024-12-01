import React from 'react';
import homeimg from '../../../assets/homescren2.jpg';

function FeaturedProduct() {
  return (
    <div
      className="featured-product text-center text-white"
      style={{
        backgroundImage: `url(${homeimg})`,
        backgroundSize: 'cover', // Assure que l'image couvre toute la zone
        backgroundPosition: 'center', // Centrer l'image
        width: '100%', // Limite la largeur à 100% du conteneur parent
        height: '500px', // Fixe une hauteur raisonnable
        display: 'flex', // Permet d'aligner le contenu (s'il y en a)
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff', // Texte blanc pour la lisibilité
      }}
    >
      {/* <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>Welcome to Our Store</h1> */}
    </div>
  );
}

export default FeaturedProduct;
