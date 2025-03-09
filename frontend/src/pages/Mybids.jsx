// src/pages/MyBids.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './MyBids.css';

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        // Call GET /api/bids/mine
        const res = await axiosInstance.get('/bids/mine');
        setBids(res.data);
      } catch (err) {
        setError('Error fetching your bids.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyBids();
  }, []);

  if (loading) return <p>Loading your bids...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-bids-container">
      <h2>My Bids</h2>
      {bids.length === 0 ? (
        <p>You haven't placed any bids yet.</p>
      ) : (
        <div className="bids-list">
          {bids.map((bid) => (
            <div key={bid._id} className="bid-card">
              <h3>{bid.productId?.title || 'Unknown Product'}</h3>
              <p>Your Bid: ${bid.bidAmount}</p>
              <p>
                Current Bid: $
                {bid.productId?.currentBid ?? bid.productId?.startingPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBids;
