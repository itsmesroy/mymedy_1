import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent
      const { data: { clientSecret } } = await axios.post('/api/create-payment-intent', {
        amount: Math.round((getCartTotal() + 50) * 100) // Convert to paise
      });

      // Confirm payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.pincode
            }
          }
        }
      });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      // Save order to database
      await axios.post('/api/orders', {
        items: cartItems,
        total: getCartTotal() + 50,
        shipping: formData
      });

      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="row g-3">
        <div className="col-12">
          <h3>Shipping Information</h3>
        </div>

        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">State</label>
          <input
            type="text"
            name="state"
            className="form-control"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">PIN Code</label>
          <input
            type="text"
            name="pincode"
            className="form-control"
            value={formData.pincode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-12 mt-4">
          <h3>Payment Information</h3>
          <div className="card-element-container">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4'
                    }
                  },
                  invalid: {
                    color: '#9e2146'
                  }
                }
              }}
            />
          </div>
        </div>

        {error && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : `Pay ₹${(getCartTotal() + 50).toFixed(2)}`}
          </button>
        </div>
      </div>
    </form>
  );
}

function Checkout() {
  return (
    <div className="checkout-page container py-5">
      <h1 className="mb-4">Checkout</h1>
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary() {
  const { cartItems, getCartTotal } = useContext(CartContext);

  return (
    <div className="order-summary">
      {cartItems.map(item => (
        <div key={item.id} className="d-flex justify-content-between mb-2">
          <span>{item.name} × {item.quantity}</span>
          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      
      <hr />
      
      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal</span>
        <span>₹{getCartTotal().toFixed(2)}</span>
      </div>
      
      <div className="d-flex justify-content-between mb-2">
        <span>Shipping</span>
        <span>₹50.00</span>
      </div>
      
      <hr />
      
      <div className="d-flex justify-content-between">
        <strong>Total</strong>
        <strong>₹{(getCartTotal() + 50).toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default Checkout; 