import { useState, useContext } from 'react';
import { products } from '../data/products';
import { CartContext } from '../context/CartContext';
import './Shop.css';

function Shop() {
  const [category, setCategory] = useState('all');
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useContext(CartContext);

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="shop-page">
      <div className="container py-5">
        <h1 className="text-center mb-4">Our Products</h1>
        
        <div className="category-filters mb-4">
          <button 
            className={`filter-btn ${category === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${category === 'pads' ? 'active' : ''}`}
            onClick={() => setCategory('pads')}
          >
            Pads
          </button>
          <button 
            className={`filter-btn ${category === 'tampons' ? 'active' : ''}`}
            onClick={() => setCategory('tampons')}
          >
            Tampons
          </button>
          <button 
            className={`filter-btn ${category === 'hygiene' ? 'active' : ''}`}
            onClick={() => setCategory('hygiene')}
          >
            Hygiene
          </button>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => {
            const quantity = getItemQuantity(product.id);
            return (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">₹{product.price.toFixed(2)}</p>
                {quantity === 0 ? (
                  <button 
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => {
                        if (quantity === 1) {
                          removeFromCart(product.id);
                        } else {
                          updateQuantity(product.id, quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Shop; 