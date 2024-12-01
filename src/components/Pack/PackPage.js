import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
// Exemple de données des packs
const packs = [
  {
    id: 1,
    title: 'Pack Anniversaire',
    products: ['Gâteau au chocolat', 'Ballons', 'Chapeaux de fête', 'Jouets surprise'],
    image: 'https://via.placeholder.com/300x200?text=Anniversaire',
  },
  {
    id: 2,
    title: 'Pack Noël',
    products: ['Sapin miniature', 'Guirlandes lumineuses', 'Boîte de chocolats', 'Bougies parfumées'],
    image: 'https://via.placeholder.com/300x200?text=Noël',
  },
  {
    id: 3,
    title: 'Pack Été',
    products: ['Lunettes de soleil', 'Serviette de plage', 'Crème solaire', 'Chapeau de paille'],
    image: 'https://via.placeholder.com/300x200?text=Été',
  },
];

function PackPage() {
  return (
    <div>

                <Navbar />
    <div className="container mt-5">

      <h1
        className="text-center mb-5"
        style={{
          color: '#C1BC97',
          fontFamily: `'Brush Script MT', cursive`,
        }}
      >
        Découvrez Nos Packs
      </h1>
      <div className="row">
        {packs.map((pack) => (
          <div key={pack.id} className="col-md-4 mb-4">
            <div
              className="card shadow-sm"
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                src={pack.image}
                alt={pack.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#8A2B46', fontWeight: 'bold' }}>
                  {pack.title}
                </h5>
                <ul style={{ paddingLeft: '20px', color: '#555' }}>
                  {pack.products.map((product, index) => (
                    <li key={index} style={{ fontSize: '14px', marginBottom: '5px' }}>
                      {product}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-outline-primary btn-sm mt-3"
                  style={{
                    borderRadius: '20px',
                    fontSize: '14px',
                    padding: '5px 15px',
                  }}
                >
                  Découvrir ce Pack
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      <Footer />
    </div>
  );
}

export default PackPage;
