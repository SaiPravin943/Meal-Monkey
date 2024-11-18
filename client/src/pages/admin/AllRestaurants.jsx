import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AllRestaurants = () => {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, [])

    const fetchRestaurants = async () => {
        await axios.get('http://localhost:6001/fetch-restaurants').then(
            (response) => {
                setRestaurants(response.data);
            }
        )
    }

    return (
        <div style={{
           
            backgroundColor: '#f4f7f9', // Lighter background color
            height: '100vh',
            padding: '3vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>

            <div style={{
                backgroundColor: '#ffffff', // Lighter card background
                padding: '2vh 3vw',
                borderRadius: '0.8rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' // Slight shadow for a modern feel
            }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    margin: '0 0 20px 0',
                    color: 'rgb(84, 109, 130)',
                }}>All Restaurants</h3>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    overflowY: 'scroll',
                    height: '70vh'
                }}>

                    {restaurants.map((restaurant) => (
                        <div key={restaurant._id} style={{
                            display: 'flex',
                            backgroundColor: '#f9f9f9', // Lighter background for restaurant cards
                            borderRadius: '10px',
                            padding: '20px',
                            gap: '20px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Adding shadow for depth
                        }}>

                            <img src={restaurant.mainImg} alt="" style={{
                                width: '20vw',
                                height: '100%',
                                borderRadius: '0.5rem'
                            }} />

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                width: '80%'
                            }}>
                                <h6 style={{
                                    fontSize: '1.2rem',
                                    color: 'rgb(51, 83, 111)',
                                    margin: '0'
                                }}>
                                    {restaurant.title}
                                </h6>

                                <p style={{
                                    fontSize: '1rem',
                                    color: 'rgb(124, 141, 155)',
                                    marginTop: '10px'
                                }}>
                                    {restaurant.address}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default AllRestaurants;
