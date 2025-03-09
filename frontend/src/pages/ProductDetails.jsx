import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../api/axiosInstance';
import { placeBid } from '../api/bidApi';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bidMessage, setBidMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      const bidVal = parseFloat(bidAmount);
      await placeBid(id, bidVal);
      setBidMessage('Bid placed successfully!');
      // Optionally re-fetch product data to show updated bid
      const res = await axiosInstance.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error('Error placing bid:', err);
      setBidMessage(
        err.response?.data?.message ||
          'Failed to place bid. Ensure your bid is higher than the current bid.'
      );
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  // Check if the logged-in user is the seller
  const isSeller =
    user &&
    product.seller &&
    product.seller.toString() === user._id.toString();

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>
        Current Bid: ${product.currentBid || product.startingPrice}
      </p>
      {/* Display bid form only if the user is logged in and not the seller */}
      {user && !isSeller ? (
        <form onSubmit={handleBid} className="bid-form">
          <label>Place your bid:</label>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter your bid"
            required
          />
          <button type="submit">Submit Bid</button>
        </form>
      ) : (
        user && isSeller && <p>You cannot bid on your own product.</p>
      )}
      {bidMessage && <p className="bid-message">{bidMessage}</p>}
    </div>
  );
};

export default ProductDetails;
