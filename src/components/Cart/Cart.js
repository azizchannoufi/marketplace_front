import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assurez-vous que axios est importé
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Modal } from 'react-bootstrap';

// Initialize Stripe
const stripePromise = loadStripe('your-publishable-key'); // Remplacez avec votre clé publique Stripe

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkoutType, setCheckoutType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('uid'));
  const [oneUser, setOneUser] = useState(null);

  const getOneUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
      if (response.status === 200) {
        setOneUser(response.data);
      } else {
        console.error("Erreur lors de la récupération des informations de l'utilisateur");
      }
    } catch (e) {
      console.error('Erreur dans la récupération de l\'utilisateur:', e);
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);

  const sendEmail = async () => {
    if (!oneUser) {
      console.error("Utilisateur introuvable pour l'envoi de l'email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/email", {
        recipientEmail: oneUser.email,
        subject: "Nouvelle Commande Acheter !!",
        message: `Votre commande est passée avec succès !\nTotal : ${totalAmount}\nType de paiement : ${checkoutType}`,
      });
      console.log('Email envoyé avec succès:', response.data);
    } catch (e) {
      console.error('Erreur lors de l\'envoi de l\'email:', e);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    const total = savedCart.reduce((sum, item) => sum + item.prix * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2>Your Cart</h2>
        <div className="row">
          <div className="col-md-8">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="mb-4 d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100px', height: '100px', marginRight: '20px' }}
                  />
                  <div>
                    <h5>{item.name}</h5>
                    <p>
                      ${parseFloat(item.prix).toFixed(2)} x {item.quantity} = $
                      {parseFloat(item.prix * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="col-md-4">
            <h4>Total: ${totalAmount.toFixed(2)}</h4>
            {cartItems.length > 0 && !checkoutType && (
              <>
                <h5>Choose Checkout Option:</h5>
                <button
                  className="btn btn-outline-dark me-3"
                  onClick={() => setCheckoutType('pickup')}
                >
                  Pickup (Cart)
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => setCheckoutType('delivery')}
                >
                  Delivery
                </button>
              </>
            )}
            {checkoutType === 'pickup' && (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  totalAmount={totalAmount}
                  onSuccess={() => {
                    handleShowModal();
                    sendEmail();
                  }}
                />
              </Elements>
            )}
            {checkoutType === 'delivery' && (
              <DeliveryForm
                totalAmount={totalAmount}
                onSuccess={() => {
                  handleShowModal();
                  sendEmail();
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Commande réussie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Merci pour votre confiance ! Votre commande a été passée avec succès, vérifier votre email.</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleCloseModal}>
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CheckoutForm({ totalAmount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Simuler une validation réussie
    localStorage.removeItem('cart');
    onSuccess();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Enter Payment Information</h5>
      <CardElement className="form-control mb-3" />
      <button type="submit" className="btn btn-primary" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
}

function DeliveryForm({ totalAmount, onSuccess }) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simuler une soumission réussie
    localStorage.removeItem('cart');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Enter Delivery Information</h5>
      <input type="text" className="form-control mb-3" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input type="text" className="form-control mb-3" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
      <input type="text" className="form-control mb-3" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      <button type="submit" className="btn btn-primary">Submit Delivery Details</button>
      <h5 className="mt-3">Total: ${totalAmount.toFixed(2)}</h5>
    </form>
  );
}

export default Cart;
