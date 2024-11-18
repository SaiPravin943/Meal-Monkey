import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [updateStatus, setUpdateStatus] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    await axios.get('http://localhost:6001/fetch-orders').then((response) => {
      setOrders(
        response.data.filter((order) => order.restaurantName === username).reverse()
      );
    });
  };

  const cancelOrder = async (id) => {
    await axios.put('http://localhost:6001/cancel-order', { id }).then((response) => {
      alert('Order cancelled!!');
      fetchOrders();
    });
  };

  const updateOrderStatus = async (id) => {
    await axios
      .put('http://localhost:6001/update-order-status', { id, updateStatus })
      .then((response) => {
        alert('Order status updated!!');
        setUpdateStatus('');
        fetchOrders();
      })
      .catch((err) => {
        alert('Order update failed!!');
      });
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Orders</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fff',
              width: '300px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <img
              src={order.foodItemImg}
              alt=""
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '15px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '18px', color: '#444' }}>
                {order.foodItemName}
              </h4>
              <p style={{ margin: '0 0 10px', color: '#777', fontSize: '14px' }}>
                <b>Restaurant:</b> {order.restaurantName}
              </p>
              <p style={{ margin: '0 0 10px', color: '#777', fontSize: '14px' }}>
                <b>Quantity:</b> {order.quantity}
              </p>
              <p style={{ margin: '0 0 10px', color: '#777', fontSize: '14px' }}>
                <b>Total Price:</b> ₹
                {parseInt(order.price - (order.price * order.discount) / 100) *
                  order.quantity}{' '}
                <s style={{ color: '#999' }}>₹{order.price * order.quantity}</s>
              </p>
              <p style={{ margin: '0 0 10px', color: '#777', fontSize: '14px' }}>
                <b>Status:</b> {order.orderStatus}
              </p>

              {order.orderStatus === 'order placed' || order.orderStatus === 'In-transit' ? (
                <div>
                  <div style={{ marginBottom: '10px' }}>
                    <select
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                      }}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    >
                      <option selected disabled>
                        Update order status
                      </option>
                      <option value="order placed">Order Accepted</option>
                      <option value="In-transit">In-transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <button
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginBottom: '10px',
                    }}
                    onClick={() => updateOrderStatus(order._id)}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantOrders;
