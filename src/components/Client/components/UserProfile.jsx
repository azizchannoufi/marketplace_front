// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Contrôle l'état d'édition

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
        if (response.status === 200) {
          setUserData(response.data);
          setEditedUserData(response.data); // Initialiser les données modifiables
        } else {
          console.log("Erreur lors de la récupération des informations utilisateur");
        }
      } catch (error) {
        console.error("Erreur dans la récupération des informations utilisateur", error);
      }
    };
    
    if (userId) {
      getUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/users/${userId}`, editedUserData);
      if (response.status === 200) {
        setUserData(editedUserData); // Mettre à jour les données utilisateur après modification
        setIsEditing(false); // Désactiver le mode édition
        alert('Informations mises à jour avec succès!');
      } else {
        console.log("Erreur lors de la mise à jour des informations");
      }
    } catch (error) {
      console.error("Erreur dans la mise à jour des informations", error);
    }
  };

  return (
    <div className="container my-5">
      {userData ? (
        <>
          <h3>Mes Informations</h3>
          {isEditing ? (
            <div>
              <form>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Nom</td>
                      <td>
                        <input
                          type="text"
                          name="full_name"
                          value={editedUserData.full_name || ''}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editedUserData.email || ''}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Numéro de téléphone</td>
                      <td>
                        <input
                          type="text"
                          name="phone"
                          value={editedUserData.phone || ''}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                    </tr>
                    {/* Ajoutez d'autres champs que vous souhaitez rendre modifiables */}
                  </tbody>
                </table>
                <button type="button" onClick={handleSave} className="btn btn-success">Enregistrer</button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary ml-2">Annuler</button>
              </form>
            </div>
          ) : (
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Nom</td>
                    <td>{userData.full_name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <td>Numéro de téléphone</td>
                    <td>{userData.phone}</td>
                  </tr>
                  {/* Ajoutez d'autres informations ici */}
                </tbody>
              </table>
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">Modifier</button>
            </div>
          )}
        </>
      ) : (
        <div>Chargement des informations...</div>
      )}
    </div>
  );
};

export default UserProfile;
