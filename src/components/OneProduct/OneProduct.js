import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Importation des icônes depuis react-icons/fa

function OneProduct() {
  const location = useLocation();
  const navigate = useNavigate(); // Utilisation de useNavigate
  const { product } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(localStorage.getItem('uid'));
  const [oneUser, setOneUser] = useState(null);
  const [rating, setRating] = useState(0); // Rating state
  const [hoverRating, setHoverRating] = useState(0); // Hover state for stars
  const [ratings, setRatings] = useState([]); // Store all ratings
  const [avgRating, setAvgRating] = useState(0); // Average rating
  const [ratingCount, setRatingCount] = useState(0); // Count of ratings

  // Fonction pour récupérer les données de l'utilisateur
  const getOneUser = async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
        if (response.status === 200) {
          setOneUser(response.data);
        } else {
          console.log("Erreur lors de la récupération des informations de l'utilisateur");
        }
      } catch (e) {
        console.error("Erreur dans la récupération de l'utilisateur:", e);
        alert("Erreur dans la récupération de l'utilisateur");
      }
    }
  };

  // Fonction pour récupérer les évaluations des produits
  const getProductRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/products/${product.id}/ratings`);
      if (response.status === 200) {
        setRatings(response.data);
        const avg = response.data.reduce((sum, rating) => sum + rating.stars, 0) / response.data.length;
        setAvgRating(avg);
        setRatingCount(response.data.length);
      }
    } catch (e) {
      console.error("Erreur lors de la récupération des évaluations:", e);
    }
  };

  useEffect(() => {
    getOneUser();
    getProductRatings();
  }, [userId, product.id]);

  // Fonction pour envoyer une notification par email
  const sendEmail = async () => {
    try {
      await axios.post("http://localhost:3001/api/email", {
        recipientEmail: oneUser.email,
        subject: "Nouvelle Commande Acheter !!",
        message: "",
      });
    } catch (e) {}
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        prix: product.prix,
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart successfully!');
  };

  // Fonction pour gérer le clic sur les étoiles
  const handleRatingClick = (index) => {
    if (!userId) {
      alert("Please log in to rate the product");
      navigate("/login"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }

    setRating(index + 1); // Met à jour la note de l'utilisateur
    // Envoie la note au serveur
    axios.post(`http://localhost:3001/api/products/${product.id}/rate`, {
      userId: userId,
      rating: index + 1
    }).then(() => {
      getProductRatings(); // Actualise les évaluations après une nouvelle évaluation
    }).catch((e) => {
      console.error("Error submitting rating:", e);
    });
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index + 1); // Met à jour la note lors du survol
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // Réinitialise la note au départ lorsque le survol cesse
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p className="text-muted">${parseFloat(product.prix).toFixed(2)}</p>
            <div className="d-flex align-items-center mb-4">
              <button className="btn btn-outline-dark mr-2" onClick={handleDecrease}>-</button>
              <span className="px-3">{quantity}</span>
              <button className="btn btn-outline-dark ml-2" onClick={handleIncrease}>+</button>
            </div>
            <button className="btn btn-dark" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <div className="mt-4">
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Categories:</strong> {product.categorie}</p>
            </div>
            
            <div className="mt-3">
              <a href="#" className="mr-2 text-dark"><i className="fab fa-facebook"></i></a>
              <a href="#" className="mr-2 text-dark"><i className="fab fa-twitter"></i></a>
              <a href="#" className="mr-2 text-dark"><i className="fab fa-instagram"></i></a>
            </div>
            
            {/* Section d'évaluation */}
            <div className="mt-4">
              <h4>Évaluez ce produit</h4>
              {userId ? (
                <div className="d-flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleRatingClick(index)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {index < (hoverRating || rating) ? (
                        <FaStar size={24} color="#FFD700" /> // Etoile remplie
                      ) : (
                        <FaRegStar size={24} color="#ccc" /> // Etoile vide
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <p>Please log in to rate this product</p>
              )}
              {rating > 0 && <p className="mt-2">Vous avez donné une note de {rating} étoile(s).</p>}
            </div>

            {/* Affichage de la note moyenne et du nombre d'évaluations */}
            <div className="mt-4">
              <h5>Average Rating: {avgRating.toFixed(1)} stars ({ratingCount} reviews)</h5>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OneProduct;
