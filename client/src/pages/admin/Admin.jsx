import React, { useEffect, useState } from 'react'
import '../../styles/Admin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [promoteList, setPromoteList] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchRestaurants();
    fetchOrders();
    fetchPromotions();
  }, []);

  const fetchUsers = async () => {
    await axios.get('http://localhost:6001/fetch-users').then(
      (response) => {
        setUsers(response.data);
      }
    )
  }

  const fetchRestaurants = async () => {
    await axios.get('http://localhost:6001/fetch-restaurants').then(
      (response) => {
        setRestaurants(response.data);
      }
    )
  }

  const fetchOrders = async () => {
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response) => {
        setOrdersCount(response.data.length);
      }
    )
  }

  const fetchPromotions = async () => {
    await axios.get('http://localhost:6001/fetch-promoted-list').then(
      (response) => {
        setPromoteList(response.data);
      }
    )
  }

  const handlePromoteCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setPromoteList([...promoteList, value]);
    } else {
      setPromoteList(promoteList.filter(size => size !== value));
    }
  }

  const handlePromoteUpdate = async () => {
    await axios.post('http://localhost:6001/update-promote-list', { promoteList }).then(
      (response) => {
        alert('Promote list updated!');
      }
    )
  }

  const approveUser = async (id) => {
    await axios.post('http://localhost:6001/approve-user', { id }).then(
      (response) => {
        alert('Restaurant approved!');
        fetchUsers();
      }
    )
  }

  const rejectUser = async (id) => {
    await axios.post('http://localhost:6001/reject-user', { id }).then(
      (response) => {
        alert('Restaurant rejected!');
        fetchUsers();
      }
    )
  }

  return (
    <div className="admin-page">

      {/* Overview Cards - Aligned Horizontally */}
      <div className="admin-overview">
        <div className="admin-card">
          <h4>Total Users</h4>
          <p>{users.length - 1}</p>
          <button onClick={() => navigate('/all-users')}>View All</button>
        </div>

        <div className="admin-card">
          <h4>All Restaurants</h4>
          <p>{restaurants.length}</p>
          <button onClick={() => navigate('/all-restaurants')}>View All</button>
        </div>

        <div className="admin-card">
          <h4>All Orders</h4>
          <p>{ordersCount}</p>
          <button onClick={() => navigate('/all-orders')}>View All</button>
        </div>
      </div>

      {/* Promotions and Pending Approvals Sections - Aligned Horizontally */}
      <div className="admin-sections">
        {/* Promotions Section */}
        <div className="admin-promotions">
          <h4>Promote Restaurants</h4>
          <div className="promotion-list">
            {restaurants.map((restaurant) => {
              return (
                <div className="promotion-item" key={restaurant._id}>
                  <input 
                    type="checkbox" 
                    value={restaurant._id} 
                    checked={promoteList.includes(restaurant._id)} 
                    onChange={handlePromoteCheckBox}
                  />
                  <span>{restaurant.title}</span>
                </div>
              )
            })}
          </div>
          <button onClick={handlePromoteUpdate}>Update Promotions</button>
        </div>

        {/* Pending Approvals Section */}
        <div className="admin-approvals">
          <h4>Pending Approvals</h4>
          <div className="approval-list">
            {users.filter(user => user.approval === 'pending').length === 0 ?
              <p>No new requests...</p> :
              users.filter(user => user.approval === 'pending').map((user) => {
                return (
                  <div className="approval-item" key={user._id}>
                    <div>
                      <h5>{user.username}</h5>
                      <p>Restaurant</p>
                    </div>
                    <div>
                      <button className="btn-approve" onClick={() => approveUser(user._id)}>Approve</button>
                      <button className="btn-reject" onClick={() => rejectUser(user._id)}>Reject</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Admin;
