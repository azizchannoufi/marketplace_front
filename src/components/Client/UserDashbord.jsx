import React, { useEffect, useState } from 'react';
import UserInfo from './components/UserInfo';
import OrderList from './components/OrderList'; // Nouveau composant pour afficher les commandes
import UserProfile from './components/UserProfile'; // Importer UserProfile
import Navbar from '../Navbar';
import Footer from '../Footer';
import Login from '../Authentification/LoginSignup'; // Composant LoginSignup
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function UserDashboard() {
  const [userId, setUserId] = useState(null); // Utilisateur non connecté au départ
  const [orders, setOrders] = useState([]); // Ajout de l'état pour les commandes
  const [oneUser, setOneUser] = useState(null); // Informations utilisateur

  const handleLogin = (userInfo) => {
    setUserId(userInfo); // Met à jour l'utilisateur après connexion
  };

  useEffect(() => {
    const savedUid = localStorage.getItem('uid');
    const savedToken = localStorage.getItem('token');

    if (savedUid && savedToken) {
      setUserId({ uid: savedUid });
    }
  }, []);

  useEffect(() => {
    // Si l'utilisateur est connecté, récupérer ses informations et ses commandes
    if (userId) {
      const getOneUser = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/users/${userId.uid}`);
          if (response.status === 200) {
            setOneUser(response.data); // Mettre à jour l'état avec les données de l'utilisateur
          } else {
            console.log("Erreur lors de la récupération des informations de l'utilisateur");
          }
        } catch (e) {
          console.error('Erreur dans la récupération de l\'utilisateur:', e);
          alert('Erreur dans la récupération de l\'utilisateur');
        }
      };

      getOneUser(); // Appel de la fonction pour récupérer les informations de l'utilisateur

      const getOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/orders/${userId.uid}`);
          if (response.status === 200) {
            setOrders(response.data); // Mettre à jour l'état avec les commandes
          } else {
            console.log("Erreur lors de la récupération des commandes");
          }
        } catch (e) {
          console.error('Erreur dans la récupération des commandes:', e);
        }
      };

      getOrders(); // Appel de la fonction pour récupérer les commandes
    }
  }, [userId]); // Dépendance seulement sur userId

  // Si l'utilisateur n'est pas connecté, afficher le composant de connexion
  if (!userId) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      {/* Navbar en haut */}
      <Navbar />

      {/* Contenu principal */}
      <div className="container my-5">
        {oneUser ? (
          <>
            {/* Affichage des informations utilisateur */}
            <UserInfo user={oneUser} />
            
            {/* Affichage des commandes passées */}
            <div className="my-4">
              <h3>Vos commandes</h3>
              {orders.length > 0 ? (
                <OrderList orders={orders} /> // Affichage de la liste des commandes
              ) : (
                <div>Aucune commande trouvée.</div>
              )}
            </div>

            {/* Ajouter un bouton pour voir les informations de l'utilisateur */}
            <div className="my-4">
            <UserProfile userId={userId.uid} />  {/* Appel du composant UserProfile */}

            </div>
          </>
        ) : (
          <div>Chargement des informations utilisateur...</div> // Afficher un message pendant le chargement
        )}
      </div>

      {/* Footer en bas */}
      <Footer />
    </div>
  );
}

export default UserDashboard;
