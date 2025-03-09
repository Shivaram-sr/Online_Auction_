// src/pages/ListProduct.jsx
import React, { useState } from 'react';
import { createProduct } from '../api/productApi';
import { useNavigate } from 'react-router-dom';
import './ListProduct.css';

const ListProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ title, description, startingPrice, endTime });
      setMessage('Product listed successfully!');
      // Optionally navigate to /products
      navigate('/products');
    } catch (error) {
      setMessage('Failed to list product. Please try again.');
    }
  };

  return (
    <div className="list-product-container">
      <h2>Sell Your Product</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="list-product-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="form-group">
          <label>Starting Price:</label>
          <input
            type="number"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            placeholder="Enter starting price"
            required
          />
        </div>
        <div className="form-group">
          <label>Auction End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          List Product
        </button>
      </form>
    </div>
  );
};

export default ListProduct;
