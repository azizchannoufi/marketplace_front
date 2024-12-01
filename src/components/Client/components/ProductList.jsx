import React from 'react';

function ProductList({ products, onEditProduct }) {
  return (
    <div>
      <h3 className="mb-4">Vos Produits</h3>
      {products.length === 0 ? (
        <p className="text-muted">Aucun produit ajouté.</p>
      ) : (
        products.map((product) => (
          <div  className="card mb-3 shadow-sm">
            <div className="card-body">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid mb-3 rounded"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <h4 className="card-title">{product.titre}</h4>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <strong>Prix :</strong> {product.prix} €
              </p>
              <button
                onClick={() => onEditProduct(product)}
                className="btn btn-outline-secondary"
              >
                Modifier
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
