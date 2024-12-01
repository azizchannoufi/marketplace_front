import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  const handleLikeProduct = () => {
    alert('Product liked!');
  };

  const isOnSale = product.prix; // Check if product is on sale
  const oldPrice = 100; // Old price of the product
  const discount = isOnSale
    ? Math.round(((oldPrice - product.prix) / oldPrice) * 100)
    : 0; // Calculate discount percentage

  return (
    <div
      className="card border-0 shadow-sm position-relative"
      style={{
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        width: '250px',
        margin: '20px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
      {isOnSale && (
          <div
            className="badge bg-danger position-absolute"
            style={{
              top: '10px',
              left: '10px',
              padding: '4px 8px', // Taille réduite
              fontSize: '12px', // Police plus petite
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(45deg, #ff4e00, #ff8c00)',
              borderRadius: '50px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
              opacity: 0.9, // Ajout d'opacité
              zIndex: 3,
            }}
          >
            {discount}% OFF
          </div>
        )}
        <img
          src={product.image}
          className="card-img-top"
          alt={product.titre}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Overlay with animation */}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            transition: 'top 0.4s ease',
            zIndex: 2,
            ...(isHovered && { top: 0 }), // Show overlay when hovered
          }}
        >
          <FaHeart
            color="white"
            size={24}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleLikeProduct();
            }}
          />
          <FaEye
            color="white"
            size={24}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleViewProduct();
            }}
          />
          <FaShoppingCart
            color="white"
            size={24}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          />
        </div>
      </div>

      {/* Product details */}
      <div
        className="card-body text-center"
        style={{
          padding: '10px',
          background: '#fff',
          zIndex: 1, // Ensure this is always above the overlay
        }}
      >
        <h5 className="card-title" style={{ fontSize: '16px', margin: '10px 0' }}>
          {product.titre}
        </h5>

        {/* Display old price and new price if product is on sale */}
        {isOnSale ? (
          <>
            <p
              className="card-text text-muted"
              style={{
                fontSize: '14px',
                textDecoration: 'line-through', // Strike-through for old price
              }}
            >
              ${oldPrice}
            </p>
            <p
              className="card-text"
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'green', // New price in green
              }}
            >
              ${product.prix}
            </p>
          </>
        ) : (
          <p className="card-text text-muted" style={{ fontSize: '14px' }}>
            ${product.prix}
          </p>
        )}

        {/* Stock display */}
        <p
          className="card-text"
          style={{
            fontSize: '14px',
            fontWeight: product.stock > 0 ? 'bold' : 'normal',
            color: product.stock > 0 ? 'green' : 'red', // Green for in stock, red for out of stock
          }}
        >
          {product.stock > 0
            ? `${product.stock} in stock`
            : 'Out of stock'}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
