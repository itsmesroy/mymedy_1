import { useState } from 'react';
import { products } from '../data/products';
import './Shop.css';

function Shop() {
  const [category, setCategory] = useState('all');

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

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
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">₹{product.price.toFixed(2)}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop; 