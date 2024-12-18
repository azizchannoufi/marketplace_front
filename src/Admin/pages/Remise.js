import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios'
const Remise = () => {

  const [load,setLoad]=useState(false)

  const [remises, setRemises] = useState([
    {
      id: 1,
      titre: 'Remise Étudiant',
      pourcentageRemise: 10,
      date_debut: '2024-01-01',
      date_fin: '2024-12-31',
      status: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRemise, setEditingRemise] = useState(null);
  const [newRemise, setNewRemise] = useState({
    titre: '',
    pourcentageRemise: '',
    date_debut: '',
    date_fin: '',
    status: 'inactive',
  });

///////////////////////////////////////API///////////////////////////////////////////////////////////////
// Fonction pour récupérer toutes les remises
const fetchRemise = async () => {
  try {
    const response = await axios.get('http://localhost:3002/api/remise/');
    if (response.status === 200) {
      console.log('Remises récupérées avec succès:', response.data);
      setRemises (response.data);
    } else {
      console.error('Erreur lors de la récupération des remises.');
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  }
};

// Fonction pour créer une nouvelle remise
const createRemise = async (info) => {
  try {
    const response = await axios.post('http://localhost:3002/api/remise/', info);
    if (response.status === 201) {
      console.log('Remise créée avec succès:', response.data);
      setLoad(!load)
    } else {
      console.error('Erreur lors de la création de la remise.');
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  }
};
// Fonction pour  afficher activer/désactiver une remise
// const fetchstatus =async(id)=>{
//   try{
//     const response = await axios.get("http://localhost:3002/api/articles/remiseart/"+id)
//     if(response.status===200){
//       console.log("remise status:",response.data)
//       return response.data.status
//     }else {
//       console.error('Erreur lors de la création de la remise.');
//     }
//   }catch(e){
//     console.error('Erreur réseau:', error);
//   }
// }



// Fonction pour activer/désactiver une remise
const activateRemise = async (idRemise, info) => {
  try {
    console.log(info);
    
    const response = await axios.put(
      `http://localhost:3002/api/articles/remise/${idRemise}`,
      {
        statusR:info
      }
    );
    if (response.status === 200) {
      console.log('Remise mise à jour avec succès:', response.data);
      setLoad(!load)
    } else {
      console.error('Erreur lors de la mise à jour de la remise.');
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  }
};


useEffect(()=>{
  fetchRemise()
},[load])
///////////////////////////////////////API///////////////////////////////////////////////////////////////

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}

  const handleShowModal = (remise = null) => {
    if (remise) {
      setEditingRemise(remise);
      setNewRemise(remise);
    } else {
      setEditingRemise(null);
      setNewRemise({ titre: '', pourcentageRemise: '', date_debut: '', date_fin: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRemise(null);
  };

  const handleAddOrUpdateRemise = () => {
    if (editingRemise) {
      setRemises(
        remises.map((remise) =>
          remise.id === editingRemise.id ? { ...newRemise, id: remise.id } : remise
        )
      );
    } else {
      createRemise(newRemise)
    }
    handleCloseModal();
  };

  const handleDeleteRemise = (id) => {
    setRemises(remises.filter((remise) => remise.id !== id));
  };

  const toggleStatus = (id,status) => {
    activateRemise(id,status)
  };

  return (
    <div>
      <h2>Gestion des Remises</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Remise</th>
            <th>Nom de la Remise</th>
            <th>Pourcentage</th>
            <th>Date de Début</th>
            <th>Date de Fin</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {remises.map((remise) => (
            <tr key={remise.id}>
              <td>{remise.id}</td>
              <td>{remise.titre}</td>
              <td>{remise.pourcentageRemise}%</td>
              <td>{formatDate(remise.date_debut)}</td>
              <td>{formatDate(remise.date_fin)}</td>
              <td>
                <Button
                  variant={remise.status=='inactive' ? 'success' : 'secondary'}
                  size="sm"
                  onClick={() => toggleStatus(remise.id,remise.status=='active'?false:true)}
                >
                  {remise.status=='inactive' ? 'Activer' : 'Désactiver'}
                </Button>
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowModal(remise)}
                >
                  Modifier
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteRemise(remise.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => handleShowModal()}>
        Ajouter une Remise
      </Button>

      {/* Modal pour ajouter ou modifier une remise */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingRemise ? 'Modifier la Remise' : 'Ajouter une Nouvelle Remise'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="remiseName">
              <Form.Label>Nom de la Remise</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de la remise"
                value={newRemise.titre}
                onChange={(e) =>
                  setNewRemise({ ...newRemise, titre: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="remisePercentage">
              <Form.Label>Pourcentage</Form.Label>
              <Form.Control
                type="number"
                placeholder="Pourcentage (%)"
                value={newRemise.pourcentageRemise}
                onChange={(e) =>
                  setNewRemise({ ...newRemise, pourcentageRemise: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="remiseStartDate">
              <Form.Label>Date de Début</Form.Label>
              <Form.Control
                type="date"
                value={newRemise.date_debut}
                onChange={(e) =>
                  setNewRemise({ ...newRemise, date_debut: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="remiseEndDate">
              <Form.Label>Date de Fin</Form.Label>
              <Form.Control
                type="date"
                value={newRemise.date_fin}
                onChange={(e) =>
                  setNewRemise({ ...newRemise, date_fin: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateRemise}>
            {editingRemise ? 'Modifier' : 'Ajouter'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Remise;
