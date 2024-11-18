import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productMenuCategory, setProductMenuCategory] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productNewCategory, setProductNewCategory] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [AvailableCategories, setAvailableCategories] = useState([]);
  const [restaurant, setRestaurant] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchCategories();
    fetchRestaurant();
    fetchItem();
  }, []);

  const fetchCategories = async () => {
    await axios.get('http://localhost:6001/fetch-categories').then(
      (response) => {
        setAvailableCategories(response.data);
      }
    )
  }

  const fetchRestaurant = async () => {
    await axios.get(`http://localhost:6001/fetch-restaurant-details/${userId}`).then(
      (response) => {
        setRestaurant(response.data);
      }
    )
  }

  const fetchItem = async () => {
    await axios.get(`http://localhost:6001/fetch-item-details/${id}`).then(
      (response) => {
        setProductName(response.data.title);
        setProductDescription(response.data.description);
        setProductMainImg(response.data.itemImg);
        setProductCategory(response.data.category);
        setProductMenuCategory(response.data.menuCategory);
        setProductPrice(response.data.price);
        setProductDiscount(response.data.discount);
      }
    )
  }

  const handleUpdateItem = async () => {
    await axios.put(`http://localhost:6001/update-product/${id}`, { restaurantId: restaurant._id, productName, productDescription, productMainImg, productCategory, productMenuCategory, productNewCategory, productPrice, productDiscount }).then(
      (response) => {
        alert("Product updated");
        setProductName('');
        setProductDescription('');
        setProductMainImg('');
        setProductCategory('');
        setProductMenuCategory('');
        setProductNewCategory('');
        setProductPrice(0);
        setProductDiscount(0);
        navigate('/restaurant-menu');
      }
    )
  }

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    header: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '5px',
      display: 'block',
    },
    radioGroup: {
      display: 'flex',
      flexDirection: 'row',
      gap:'30px' ,
    },
    radio: {
      marginBottom: '10px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%',
      marginTop: '20px',
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Update Item</h3>
      <div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Name</label>
          <input type="text" style={styles.input} value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Description</label>
          <input type="text" style={styles.input} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Thumbnail Image URL</label>
          <input type="text" style={styles.input} value={productMainImg} onChange={(e) => setProductMainImg(e.target.value)} />
        </div>
        <section>
          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Type</h4>
          <div style={styles.radioGroup}>
            <div style={styles.radio}>
              <input className="form-check-input" type="radio" name="productCategory" value="Veg" checked={productCategory === 'Veg'} onChange={(e) => setProductCategory(e.target.value)} />
              <label style={styles.label}>Veg</label>
            </div>
            <div style={styles.radio}>
              <input className="form-check-input" type="radio" name="productCategory" value="Non Veg" checked={productCategory === 'Non Veg'} onChange={(e) => setProductCategory(e.target.value)} />
              <label style={styles.label}>Non Veg</label>
            </div>
            <div style={styles.radio}>
              <input className="form-check-input" type="radio" name="productCategory" value="Beverages" checked={productCategory === 'Beverages'} onChange={(e) => setProductCategory(e.target.value)} />
              <label style={styles.label}>Beverages</label>
            </div>
          </div>
        </section>
        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select style={styles.input} value={productMenuCategory} onChange={(e) => setProductMenuCategory(e.target.value)}>
            <option value="">Choose Product category</option>
            {AvailableCategories.map((category) => {
              return (
                <option key={category} value={category}>{category}</option>
              )
            })}
            <option value="new category">New category</option>
          </select>
        </div>
        {productMenuCategory === 'new category' && (
          <div style={styles.formGroup}>
            <label style={styles.label}>New Category</label>
            <input type="text" style={styles.input} value={productNewCategory} onChange={(e) => setProductNewCategory(e.target.value)} />
          </div>
        )}
        <div style={styles.formGroup}>
          <label style={styles.label}>Price</label>
          <input type="number" style={styles.input} value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Discount (in %)</label>
          <input type="number" style={styles.input} value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />
        </div>
        <button style={styles.button} onClick={handleUpdateItem}>Update</button>
      </div>
    </div>
  );
}

export default EditProduct;
