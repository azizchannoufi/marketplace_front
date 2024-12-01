import React, { useState } from 'react';
import { Table, Button, Modal, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const Remise = () => {
  const [remises, setRemises] = useState([
    {
      id: 1,
      name: 'Remise Étudiant',
      percentage: 10,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRemise, setEditingRemise] = useState(null);
  const [newRemise, setNewRemise] = useState({
    name: '',
    percentage: '',
    startDate: '',
    endDate: '',
    status: true,
  });

  const handleShowModal = (remise = null) => {
    if (remise) {
      setEditingRemise(remise);
      setNewRemise(remise);
    } else {
      setEditingRemise(null);
      setNewRemise({ name: '', percentage: '', startDate: '', endDate: '', status: true });
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
      setRemises([
        ...remises,
        {
          ...newRemise,
          id: remises.length + 1,
        },
      ]);
    }
    handleCloseModal();
  };

  const handleDeleteRemise = (id) => {
    setRemises(remises.filter((remise) => remise.id !== id));
  };

  const toggleStatus = (id) => {
    setRemises(
      remises.map((remise) =>
        remise.id === id ? { ...remise, status: !remise.status } : remise
      )
    );
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
              <td>{remise.name}</td>
              <td>{remise.percentage}%</td>
              <td>{remise.startDate}</td>
              <td>{remise.endDate}</td>
              <td>
                <Button
                  variant={remise.status ? 'success' : 'secondary'}
                  size="sm"
                  onClick={() => toggleStatus(remise.id)}
                >
                  {remise.status ? 'Activer' : 'Désactiver'}
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
                value={newRemise.name}
                onChange={(e) =>
                  setNewRemise({ ...newRemise, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="remisePercentage">
              <Form.Label>Pourcentage</Form.Label>
              <Form.Control
                type="number"
                placeholder="Pourcentage (%)"
                value={newRemise.percentage}
                onChange={(e) =>
                  setNewRemise({ ...newRemise, percentage: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="remiseStartDate">
              <Form.Label>Date de Début</Form.Label>
              <Form.Control
                type="date"
                value={newRemise.startDate}
                onChange={(e) =>
                  setNewRemise({ ...newRemise, startDate: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="remiseEndDate">
              <Form.Label>Date de Fin</Form.Label>
              <Form.Control
                type="date"
                value={newRemise.endDate}
                onChange={(e) =>
                  setNewRemise({ ...newRemise, endDate: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="remiseStatus">
              <Form.Label>Status</Form.Label>
              <ToggleButtonGroup
                type="radio"
                name="status"
                value={newRemise.status ? 1 : 0}
                onChange={(value) =>
                  setNewRemise({ ...newRemise, status: value === 1 })
                }
              >
                <ToggleButton variant="success" value={1}>
                  Activer
                </ToggleButton>
                <ToggleButton variant="secondary" value={0}>
                  Désactiver
                </ToggleButton>
              </ToggleButtonGroup>
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
