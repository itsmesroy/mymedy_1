import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './Shop.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('all');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page container py-5">
      <h1 className="text-center mb-5">Our Products</h1>

      <div className="category-filters mb-4">
        <div className="btn-group" role="group">
          <button
            className={`btn ${category === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategory('all')}
          >
            All Products
          </button>
          <button
            className={`btn ${category === 'pads' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategory('pads')}
          >
            Pads
          </button>
          <button
            className={`btn ${category === 'tampons' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategory('tampons')}
          >
            Tampons
          </button>
          <button
            className={`btn ${category === 'hygiene' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategory('hygiene')}
          >
            Hygiene Products
          </button>
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 product-card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted mb-2">{product.description}</p>
                <div className="mt-auto">
                  <p className="price mb-2">₹{product.price.toFixed(2)}</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop; 