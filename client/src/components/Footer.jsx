import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footer}>
      <h4 style={styles.title}>Meal Monkey - Delivering Happiness, One Meal at a Time</h4>
      
      

      <div style={styles.contact}>
        <h5 style={styles.contactTitle}>Connect With Us</h5>
        <p>Email: support@meal-monkey.com</p>
        <p>Phone: +1 (800) 123-4567</p>
        <div style={styles.socialIcons}>
          <span style={styles.icon}>🌐</span> {/* Website */}
          <span style={styles.icon}>📘</span> {/* Facebook */}
          <span style={styles.icon}>📸</span> {/* Instagram */}
          <span style={styles.icon}>🐦</span> {/* Twitter */}
        </div>
      </div>

      <div style={styles.footerBottom}>
        <p>&copy; 2024 Meal Monkey. All rights reserved.</p>
        <p>Crafted with ❤️ by Meal Monkey Development Team</p>
      </div>
    </div>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c2c2c',
    color: '#f1f1f1',
    textAlign: 'center',
    padding: '30px 0',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.7rem',
    marginBottom: '25px',
    color: '#e74c3c',
  },
  footerBody: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  list: {
    listStyleType: 'none',
    padding: '0 20px',
    margin: '0',
  },
  listItem: {
    marginBottom: '10px',
    fontSize: '1rem',
    color: '#f1f1f1',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  listItemHover: {
    color: '#e67e22',
  },
  contact: {
    marginTop: '20px',
    textAlign: 'center',
  },
  contactTitle: {
    fontSize: '1.3rem',
    marginBottom: '10px',
    color: '#e74c3c',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
  },
  icon: {
    fontSize: '1.8rem',
    margin: '0 10px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  iconHover: {
    transform: 'scale(1.2)',
  },
  footerBottom: {
    marginTop: '30px',
    borderTop: '1px solid #444',
    paddingTop: '15px',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
};

export default Footer;
