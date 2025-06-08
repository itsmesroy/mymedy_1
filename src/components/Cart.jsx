import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart
  } = useContext(CartContext);
  
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Cart is Empty</h2>
        <p className="mb-4">Add some products to your cart to see them here.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/shop')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page container py-5">
      <h1 className="mb-4">Shopping Cart</h1>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item mb-3 pb-3 border-bottom">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-4">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-0">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="col-md-3">
                      <div className="quantity-controls">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <p className="mb-0">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="col-md-1">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn btn-outline-danger"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>₹50.00</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>₹{(getCartTotal() + 50).toFixed(2)}</strong>
              </div>
              
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart; 