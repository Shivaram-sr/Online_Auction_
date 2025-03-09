import { useState } from 'react';
import { placeBid } from '../api/bidApi';

const useBid = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submitBid = async (productId, bidAmount) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await placeBid({ productId, bidAmount });
      setSuccess("Bid placed successfully!");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { submitBid, loading, error, success };
};

export default useBid;

