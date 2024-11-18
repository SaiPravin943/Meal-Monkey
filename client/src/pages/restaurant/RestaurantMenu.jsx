import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantMenu = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const [availableCategories, setAvailableCategories] = useState([]);
  const [restaurant, setRestaurant] = useState(null); // Initialize as null to handle conditional rendering
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    fetchRestaurant();
    fetchCategories();
    fetchItems();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-categories');
      setAvailableCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`http://localhost:6001/fetch-restaurant-details/${userId}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-items');
      setItems(response.data);
      setVisibleItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const [sortFilter, setSortFilter] = useState('popularity');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter((size) => size !== value));
    }
  };

  const handleTypeCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setTypeFilter([...typeFilter, value]);
    } else {
      setTypeFilter(typeFilter.filter((size) => size !== value));
    }
  };

  const handleSortFilterChange = (e) => {
    const value = e.target.value;
    setSortFilter(value);

    const sortedItems = [...visibleItems]; // Create a copy of the array
    if (value === 'low-price') {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (value === 'high-price') {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (value === 'discount') {
      sortedItems.sort((a, b) => b.discount - a.discount);
    } else if (value === 'rating') {
      sortedItems.sort((a, b) => b.rating - a.rating);
    }
    setVisibleItems(sortedItems);
  };

  useEffect(() => {
    const filteredItems = items.filter((product) => {
      const matchesCategory = categoryFilter.length
        ? categoryFilter.includes(product.menuCategory)
        : true;
      const matchesType = typeFilter.length
        ? typeFilter.includes(product.category)
        : true;

      return matchesCategory && matchesType;
    });
    setVisibleItems(filteredItems);
  }, [categoryFilter, typeFilter, items]);

  if (!restaurant) {
    return <div>Loading...</div>; // Render a loader until restaurant data is available
  }

  return (
    <div className="AllRestaurantsPage" style={{ marginTop: '14vh' }}>
      <div className="restaurants-container">
        <div className="restaurants-filter">
          <h4>Filters</h4>
          <div className="restaurant-filters-body">
            <div className="filter-sort">
              <h6>Sort By</h6>
              <div className="filter-sort-body sub-filter-body">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="filter-sort-radio1"
                    value="popularity"
                    onChange={handleSortFilterChange}
                  />
                  <label className="form-check-label" htmlFor="filter-sort-radio1">
                    Popularity
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="filter-sort-radio2"
                    value="low-price"
                    onChange={handleSortFilterChange}
                  />
                  <label className="form-check-label" htmlFor="filter-sort-radio2">
                    Low Price
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="filter-sort-radio3"
                    value="high-price"
                    onChange={handleSortFilterChange}
                  />
                  <label className="form-check-label" htmlFor="filter-sort-radio3">
                    High Price
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="filter-sort-radio4"
                    value="discount"
                    onChange={handleSortFilterChange}
                  />
                  <label className="form-check-label" htmlFor="filter-sort-radio4">
                    Discount
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="filter-sort-radio5"
                    value="rating"
                    onChange={handleSortFilterChange}
                  />
                  <label className="form-check-label" htmlFor="filter-sort-radio5">
                    Rating
                  </label>
                </div>
              </div>
            </div>

            <div className="filter-categories">
              <h6>Food Type</h6>
              <div className="filter-categories-body sub-filter-body">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Veg"
                    id="filter-category-check-1"
                    checked={typeFilter.includes('Veg')}
                    onChange={handleTypeCheckBox}
                  />
                  <label className="form-check-label" htmlFor="filter-category-check-1">
                    Veg
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Non Veg"
                    id="filter-category-check-2"
                    checked={typeFilter.includes('Non Veg')}
                    onChange={handleTypeCheckBox}
                  />
                  <label className="form-check-label" htmlFor="filter-category-check-2">
                    Non Veg
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Beverages"
                    id="filter-category-check-3"
                    checked={typeFilter.includes('Beverages')}
                    onChange={handleTypeCheckBox}
                  />
                  <label className="form-check-label" htmlFor="filter-category-check-3">
                    Beverages
                  </label>
                </div>
              </div>
            </div>

            <div className="filter-categories">
              <h6>Categories</h6>
              <div className="filter-categories-body sub-filter-body">
                {availableCategories.map((category) => (
                  <div className="form-check" key={category}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={category}
                      id={`filter-category-check-${category}`}
                      checked={categoryFilter.includes(category)}
                      onChange={handleCategoryCheckBox}
                    />
                    <label className="form-check-label" htmlFor={`filter-category-check-${category}`}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="restaurants-body">
          <h3>All Items</h3>
          <div className="restaurants">
            {visibleItems
              .filter((item) => item.restaurantId === restaurant._id)
              .map((item) => (
                <div className="restaurant-item" key={item._id}>
                  <div className="restaurant">
                    <img src={item.itemImg} alt="" />
                    <div className="restaurant-data">
                      <h6>{item.title}</h6>
                      <p>{item.description.slice(0, 25) + '...'}</p>
                      <h6>&#8377; {item.price}</h6>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/update-product/${item._id}`)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
