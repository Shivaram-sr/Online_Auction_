import React, { useState } from 'react';
import { createCheckoutSession } from '../api/payment';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const data = await createCheckoutSession({ productId: 'someProductId', bidAmount: 100 });
      // For demonstration, log the session ID.
      console.log('Checkout session:', data.sessionId);
      // In a real scenario, redirect to the Stripe checkout page:
      // window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <p>Click the button below to proceed to secure payment.</p>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default Payment;
