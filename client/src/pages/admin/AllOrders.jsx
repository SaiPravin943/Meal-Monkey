import React, { useEffect, useState } from 'react'
import '../../styles/AllOrders.css'
import axios from 'axios';

const AllOrders = () => {

  const [orders, setOrders] = useState([]);
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = async () => {
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response) => {
        setOrders(response.data.reverse());
      }
    )
  }

  const cancelOrder = async (id) => {
    await axios.put('http://localhost:6001/cancel-order', { id }).then(
      (response) => {
        alert('Order cancelled!!');
        fetchOrders();
      }
    )
  }

  const updateOrderStatus = async (id) => {
    await axios.put('http://localhost:6001/update-order-status', { id, updateStatus }).then(
      (response) => {
        alert("Order status updated!!");
        setUpdateStatus('');
        fetchOrders();
      }
    ).catch((err) => {
      alert("Order update failed!!");
    })
  }

  return (
    <div className="all-orders-page">
      <h3>Orders</h3>

      <div className="all-orders">
        {orders.map((order) => (
          <div className="all-orders-order" key={order._id}>
            <img src={order.foodItemImg} alt={order.foodItemName} />
            <div className="all-orders-order-data">
              <h4>{order.foodItemName}</h4>
              <p>{order.restaurantName}</p>

              <div className="user-details">
                <span><b>UserId: </b>{order.userId}</span>
                <span><b>Name: </b>{order.name}</span>
                <span><b>Mobile: </b>{order.mobile}</span>
                <span><b>Email: </b>{order.email}</span>
              </div>

              <div className="order-details">
                <span><b>Quantity: </b>{order.quantity}</span>
                <span><b>Total Price: </b> &#8377; {parseInt(order.price - (order.price * order.discount) / 100) * order.quantity} <s>&#8377; {order.price * order.quantity}</s></span>
                <span><b>Payment mode: </b>{order.paymentMethod}</span>
              </div>

              <div className="address-details">
                <span><b>Address: </b>{order.address}</span>
                <span><b>Pincode: </b>{order.pincode}</span>
                <span><b>Ordered on: </b>{order.orderDate.slice(0, 10)} Time: {order.orderDate.slice(11, 16)}</span>
              </div>

              <div className="order-status">
                <span><b>Status: </b>{order.orderStatus}</span>
              </div>

              {order.orderStatus === 'order placed' || order.orderStatus === 'In-transit' ? (
                <div className="action-buttons">
                  <div>
                    <select className="form-select form-select-sm" id='flotingSelect-allOrders' onChange={(e) => setUpdateStatus(e.target.value)} value={updateStatus}>
                      <option selected disabled>Update order status</option>
                      <option value="order placed">Order Accepted</option>
                      <option value="In-transit">In-transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <button className='btn btn-primary' onClick={() => updateOrderStatus(order._id)}>Update</button>
                  </div>
                  <button className="btn btn-outline-danger" onClick={() => cancelOrder(order._id)}>Cancel</button>
                </div>
              ) : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllOrders;
