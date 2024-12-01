import React from 'react';

function OrderList({ orders }) {
  return (
    <div>
      <ul className="list-group">
        {orders.map(order => (
          <li className="list-group-item" key={order._id}>
            <h5>Commande #{order._id}</h5>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <p>Total: {order.total} €</p>
            <h6>Produits :</h6>
            <ul>
              {order.products.map((product, index) => (
                <li key={index}>{product.name} - {product.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
