import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const {
    setUsername,
    setEmail,
    setPassword,
    setUsertype,
    usertype,
    setRestaurantAddress,
    setRestaurantImage,
    register,
  } = useContext(GeneralContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create Your Account</h2>
       
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              style={styles.input}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                style={styles.input}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? '❌' : '👁️'}
              </span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>User Type</label>
            <select
              style={styles.select}
              onChange={(e) => setUsertype(e.target.value)}
            >
              <option value="">Select user type</option>
              <option value="admin">Admin</option>
              <option value="restaurant">Restaurant</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {usertype === 'restaurant' && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Restaurant Address</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Enter restaurant address"
                  onChange={(e) => setRestaurantAddress(e.target.value)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Thumbnail Image URL</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Enter image URL"
                  onChange={(e) => setRestaurantImage(e.target.value)}
                />
              </div>
            </>
          )}

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account?{' '}
          <span style={styles.link} onClick={() => setIsLogin(true)}>
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    background: '#f3f4f6',
    marginTop:'80px',
    padding: '20px',
  },
  formContainer: {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '10px',
    color: '#333',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#666',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '0.9rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
  },
  passwordToggle: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#555',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background 0.3s',
  },
  buttonHover: {
    background: '#0056b3',
  },
  footer: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#555',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Register;
