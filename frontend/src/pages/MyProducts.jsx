// src/pages/MyProducts.jsx
import React, { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { getMyProducts } from '../api/productApi';
import './MyProducts.css';
import { AuthContext } from '../context/AuthContext';

const MyProducts = () => {
  const { user, setUser } = useContext(AuthContext);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMyProducts = async () => {
      try {
        const response = await getMyProducts();
        console.log(response)
        setMyProducts(response.data);
      } catch (err) {
        console.log(err)
        setError('Error fetching your products.');
      } finally {
        setLoading(false);
      }
    };
    loadMyProducts();
  }, []);

  if (loading) return <p>Loading your products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-products-container">
      <h2>My Products</h2>
      {myProducts.length === 0 ? (
        <p>You haven't listed any products yet.</p>
      ) : (
        <div className="products-list">
          {myProducts.map(product => (
            <div key={product._id} className="product-card">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>
                Current Bid: ${product.currentBid || product.startingPrice}
              </p>
              <Link to={`/product/${product._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
