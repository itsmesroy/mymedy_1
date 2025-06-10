import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const [cartCount, setCartCount] = useState(0);

  // Select featured products from the shop products
  const featuredProducts = [
    products[0], // MY Anion Pad
    products[2], // MY Tampon
    products[3], // MY Cup
    products[4]  // MY Wash
  ];

  const handleAddToCart = (product) => {
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProduct = existingCart.find(item => item.id === product.id);
    
    if (existingProduct) {
      // If product exists, increase quantity
      existingProduct.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(existingCart));
    } else {
      // If product doesn't exist, add it with quantity 1
      const newCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    
    // Update cart count
    setCartCount(prevCount => prevCount + 1);
    
    // Navigate to cart page
    window.location.href = '/cart';
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Your Health, Our Priority</h1>
          <p>Discover a wide range of quality medicines and healthcare products</p>
          <Link to="/shop" className="cta-button">Shop Now</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose MyMedy?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="bi bi-shield-check"></i>
              <h3>Genuine Products</h3>
              <p>100% authentic medicines from authorized distributors</p>
            </div>
            <div className="feature-card">
              <i className="bi bi-truck"></i>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="feature-card">
              <i className="bi bi-currency-rupee"></i>
              <h3>Best Prices</h3>
              <p>Competitive prices and regular discounts</p>
            </div>
            <div className="feature-card">
              <i className="bi bi-headset"></i>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">₹{product.price.toFixed(2)}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Popular Categories</h2>
          <div className="categories-grid">
            <Link to="/shop?category=medicines" className="category-card">
              <i className="bi bi-capsule"></i>
              <h3>Medicines</h3>
            </Link>
            <Link to="/shop?category=vitamins" className="category-card">
              <i className="bi bi-droplet"></i>
              <h3>Vitamins & Supplements</h3>
            </Link>
            <Link to="/shop?category=personal-care" className="category-card">
              <i className="bi bi-heart"></i>
              <h3>Personal Care</h3>
            </Link>
            <Link to="/shop?category=medical-devices" className="category-card">
              <i className="bi bi-thermometer"></i>
              <h3>Medical Devices</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="health-tips">
        <div className="container">
          <h2>Health Tips & Articles</h2>
          <div className="tips-grid">
            <article className="tip-card">
              <img src="/images/health-tip-1.jpg" alt="Healthy Lifestyle" />
              <h3>Maintaining a Healthy Lifestyle</h3>
              <p>Tips for staying healthy in today's busy world</p>
              <Link to="/blog/healthy-lifestyle" className="read-more">Read More</Link>
            </article>
            <article className="tip-card">
              <img src="/images/health-tip-2.jpg" alt="Immunity Boosting" />
              <h3>Boost Your Immunity</h3>
              <p>Natural ways to strengthen your immune system</p>
              <Link to="/blog/boost-immunity" className="read-more">Read More</Link>
            </article>
            <article className="tip-card">
              <img src="/images/health-tip-3.jpg" alt="Mental Wellness" />
              <h3>Mental Wellness</h3>
              <p>Taking care of your mental health</p>
              <Link to="/blog/mental-wellness" className="read-more">Read More</Link>
            </article>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for health tips and exclusive offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home; 