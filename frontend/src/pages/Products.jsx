// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api/productApi';
import useAuth from '../hooks/useAuth';
import './Products.css';

const Products = () => {
  const { user } = useAuth();
  console.log("user:",user)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getAllProducts();
        const filteredProducts = response.data.filter(
          (product) => product?.seller?.email?.trim().toLowerCase() !== user?.email?.trim().toLowerCase()
        );
        setProducts(filteredProducts);
      } catch (err) {
        setError('Error fetching products.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  


  return (
    <div className="products-container">
      <h2>Products</h2>

      {/* Sell a Product link (visible only if the user is logged in) */}
      {user && (
        <Link to="/list-product" className="sell-button">
          Sell a Product
        </Link>
      )}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Current Bid: ${product.currentBid || product.startingPrice}</p>
            <Link to={`/product/${product._id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;


