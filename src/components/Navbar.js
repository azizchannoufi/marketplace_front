import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [likeCount, setLikeCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    setIsLoggedIn(!!uid);

    // Simuler les notifications pour les likes et le panier
    setLikeCount(1); // Exemple : Une notification de like
    setCartCount(2); // Exemple : Deux articles dans le panier
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container d-flex justify-content-between align-items-center">

        {/* Titre personnalisé à gauche */}
        <Link to="/" className="navbar-brand" style={{ textDecoration: 'none' }}>
          <h1 style={{
            fontFamily: `'Brush Script MT', cursive`,
            fontSize: '28px',
            color: '#C1BC97',
            margin: 0,
            fontWeight: 'bold',
          }}>
            Le Monde Creatif
          </h1>
        </Link>

        {/* Liens de navigation au centre */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <Link
                className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
                to="/"
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#000',
                  textDecoration: 'none',
                }}
                onClick={() => handleLinkClick('/')}
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                className={`nav-link ${activeLink === '/shop' ? 'active' : ''}`}
                to="/shop"
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#000',
                  textDecoration: 'none',
                }}
                onClick={() => handleLinkClick('/shop')}
              >
                Shop
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                className={`nav-link ${activeLink === '/solde' ? 'active' : ''}`}
                to="/solde"
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#000',
                  textDecoration: 'none',
                }}
                onClick={() => handleLinkClick('/solde')}
              >
                Solde
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                className={`nav-link ${activeLink === '/packs' ? 'active' : ''}`}
                to="/packs"
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#000',
                  textDecoration: 'none',
                }}
                onClick={() => handleLinkClick('/packs')}
              >
                Packs
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                className={`nav-link ${activeLink === '/about' ? 'active' : ''}`}
                to="/about"
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#000',
                  textDecoration: 'none',
                }}
                onClick={() => handleLinkClick('/about')}
              >
                Our Story
              </Link>
            </li>
          </ul>
        </div>

        {/* Icônes à droite avec notifications */}
        <div className="d-flex align-items-center position-relative">
          <div className="position-relative mx-3">
            <Link to="/likes" className="text-dark" aria-label="Likes">
              <FaHeart size={20} />
            </Link>
            {likeCount > 0 && (
              <span
                className="badge bg-danger text-white position-absolute"
                style={{
                  top: '-5px',
                  right: '-10px',
                  fontSize: '12px',
                  zIndex: 1000,
                  borderRadius: '50%',
                  padding: '4px 6px',
                }}
              >
                {likeCount}
              </span>
            )}
          </div>

          <div className="position-relative mx-3">
            <Link to="/cart" className="text-dark" aria-label="Panier">
              <FaShoppingCart size={20} />
            </Link>
            {cartCount > 0 && (
              <span
                className="badge bg-danger text-white position-absolute"
                style={{
                  top: '-5px',
                  right: '-10px',
                  fontSize: '12px',
                  zIndex: 1000,
                  borderRadius: '50%',
                  padding: '4px 6px',
                }}
              >
                {cartCount}
              </span>
            )}
          </div>

          <Link to="/profile" className="text-dark mx-3" aria-label="Compte Utilisateur">
            <FaUser size={20} />
          </Link>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger ml-3"
              style={{ fontSize: '14px' }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
