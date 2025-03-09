import React,{useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // if(user){
  //   navigate('/dashboard')
  // }
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Online Auction Platform</h1>
          <p className="hero-subtitle">
            Bid on exclusive products and experience premium auctions.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="hero-button">
              Login
            </Link>
            <Link to="/register" className="hero-button signup-button">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="info-section">
        <div className="info-card">
          <h2>Exclusive Items</h2>
          <p>Discover rare and valuable products in our exclusive auctions.</p>
        </div>
        <div className="info-card">
          <h2>Secure Bidding</h2>
          <p>Bid with confidence thanks to our secure payment and bidding system.</p>
        </div>
        <div className="info-card">
          <h2>Premium Experience</h2>
          <p>Enjoy a smooth, professional, and premium user experience.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;



