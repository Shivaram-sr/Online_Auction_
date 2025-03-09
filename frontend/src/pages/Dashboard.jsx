import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaBoxOpen,
  FaGavel,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    activeBids: 0,
    productsListed: 0,
    totalSales: 0,
    recentBids: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        setError('Failed to load dashboard stats.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchStats();
  }, [user]);

  // If you no longer need the logout logic, you can remove this entirely
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-user">
          <img
            src="/images/default-avatar.png"
            alt="User"
            className="user-avatar"
          />
          <h3>{user.name}</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <FaHome />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <FaBoxOpen />
              <Link to="/products">Products</Link>
            </li>
            <li>
              <FaBoxOpen />
              <Link to="/my-products">My Products</Link>
            </li>
            <li>
              <FaGavel />
              <Link to="/mybids">My bids</Link>
            </li>
          </ul>
        </nav>
        {/* Remove or comment out the logout button */}
        {/* 
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
        */}
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="welcome-message">
            <h2>Welcome back, {user.name}!</h2>
            <p>Your auction activity overview:</p>
          </div>
        </header>
        <section className="dashboard-content">
          {error && <p className="error-message">{error}</p>}
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Active Bids</h3>
              <p className="stat-value">{stats.activeBids}</p>
            </div>
            <div className="stat-card">
              <h3>Products Listed</h3>
              <p className="stat-value">{stats.productsListed}</p>
            </div>
            <div className="stat-card">
              <h3>Total Sales</h3>
              <p className="stat-value">${stats.totalSales}</p>
            </div>
          </div>
          <div className="recent-bids">
            <h3>Recent Bids</h3>
            {stats.recentBids.length === 0 ? (
              <p>No recent bids.</p>
            ) : (
              stats.recentBids.map((bid, index) => (
                <div key={index} className="bid-item">
                  <p>
                    <strong>{bid.productTitle || 'Product'}</strong> - $
                    {bid.bidAmount}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
