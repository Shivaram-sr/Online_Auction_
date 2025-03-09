import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      {/* Left Section (Brand) */}
      <div style={styles.leftSection}>
        <Link to="/" style={styles.logo}>
          Online Auction
        </Link>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* If user is NOT logged in, show Login & Sign Up */}
        {!user && (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Sign Up
            </Link>
          </>
        )}

        {/* If user IS logged in, show only Logout */}
        {user && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

// Inline styles (optional). You can move these to a separate CSS file.
const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {},
  rightSection: {
    display: 'flex',
    gap: '1rem',
  },
  logo: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  logoutBtn: {
    color: '#fff',
    backgroundColor: '#2980b9',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

export default Navbar;

