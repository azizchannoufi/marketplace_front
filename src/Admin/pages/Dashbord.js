// pages/Dashboard.js
import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = () => {
  // Données pour les graphiques
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventes',
        data: [150, 200, 170, 220, 180, 250],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Commandes Livrées', 'Commandes Non Livrées'],
    datasets: [
      {
        data: [300, 120],
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      },
    ],
  };

  const productTableData = [
    { id: 1, name: 'Produit A', price: '€20.00', stock: 100 },
    { id: 2, name: 'Produit B', price: '€30.00', stock: 80 },
    { id: 3, name: 'Produit C', price: '€40.00', stock: 50 },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <Row className="mt-4">
        {/* Statistiques */}
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ventes Totales</Card.Title>
              <Card.Text>€10,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Commandes</Card.Title>
              <Card.Text>320</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Clients</Card.Title>
              <Card.Text>120</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graphiques */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Graphique des Ventes</Card.Title>
              <Line data={lineChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Répartition des Commandes</Card.Title>
              <Pie data={pieChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tableau des produits */}
      {/* <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Liste des Produits</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prix</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productTableData.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;
