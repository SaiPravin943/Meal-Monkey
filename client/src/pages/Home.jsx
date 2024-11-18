import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import PopularRestaurants from '../components/PopularRestaurants'
import axios from 'axios'

const Home = () => {

  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants();
      }, [])

    const fetchRestaurants = async() =>{
        await axios.get('http://localhost:6001/fetch-restaurants').then(
          (response)=>{
            setRestaurants(response.data);
          }
        )
      }

  return (
    <div className="HomePage">

      <div className="home-categories-container">

      <div className="home-category-card" onClick={() => navigate('/category/Biriyani')}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-VXaTJIkc6rk02DU8r7r9zR-KaeWvH1oKA&usqp=CAU"
            alt=""
          />
          <h5>Biriyani</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Pizza')}>
          <img
            src="https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D&w=1000&q=80"
            alt=""
          />
          <h5>Pizza</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Ice Cream')}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8mkVicoiANClEqKc1x7cei5pPBeuc4DZmg&s"
            alt=""
          />
          <h5>Ice Cream</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Cake')}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpf1eoNbsWblTDxgrmnzqLSutOOZBoo69CNg&s"
            alt=""
          />
          <h5>Cake</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/South Indian')}>
          <img
            src="https://sinamontales.wordpress.com/wp-content/uploads/2013/03/dsc_0194.jpg?w=768"
            alt=""
          />
          <h5>South Indian</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Chinese')}>
          <img
            src="https://www.tastingtable.com/img/gallery/20-chinese-foods-you-need-to-try-at-least-once/chow-mein-1682450318.jpg"
            alt=""
          />
          <h5>Chinese</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Momos')}>
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2024/4/414845519/RI/NC/PJ/39612703/soya-nutrela-momos.jpg"
            alt=""
          />
          <h5>Momos</h5>
        </div>
        

      </div>

      <PopularRestaurants />

      <div className="restaurants-container">
        <div className="restaurants-body">
            <h3>All restaurants</h3>
            <div className="restaurants">

                {restaurants.map((restaurant) =>(

                  <div className='restaurant-item' key={restaurant._id}>
                      <div className="restaurant" onClick={()=> navigate(`/restaurant/${restaurant._id}`)}>
                          <img src={restaurant.mainImg} alt="" />
                          <div className="restaurant-data">
                              <h6>{restaurant.title}</h6>
                              <p>{restaurant.address}</p>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
        </div>
    </div>
      <Footer />
    </div>
  )
}

export default Home