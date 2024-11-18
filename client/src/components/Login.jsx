import React, { useState, useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Welcome Back!</h2>
        <p style={styles.subHeading}>
          Log in to access your account.
        </p>
        <form onSubmit={handleLogin} style={styles.form}>
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

          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
        <p style={styles.footer}>
          Don't have an account?{' '}
          <span style={styles.link} onClick={() => setIsLogin(false)}>
            Sign up here
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
    minHeight: '60vh',
    background: '#f3f4f6',
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

export default Login;
