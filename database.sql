-- Create users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample products
INSERT INTO products (name, description, price, image, category, stock) VALUES
('MY Anion Pad', '100% Cotton Antibacterial Sanitary Napkins', 8.50, 'anion-pads.png', 'pads', 100),
('MY Liner', 'Antibacterial Panty Liners', 3.50, 'liners.png', 'pads', 150),
('MY Tampon', '100% Cotton Digital Tampons (Pouch of 10)', 120.00, 'tampons.png', 'tampons', 50),
('MY Cup', 'Menstrual Cup', 250.00, 'cup.png', 'hygiene', 30),
('MY Wash', 'Female Intimate Wash (50 ml)', 80.00, 'wash.png', 'hygiene', 75),
('MY Sanitizer', 'Hand Sanitizer (50 ml)', 50.00, 'sanitizer.png', 'hygiene', 100),
('MY Mist', 'Body Mist (100 ml)', 200.00, 'mist.png', 'hygiene', 40),
('MY Gyno Wipes', 'Natural Intimate Wipes (Pack of 5)', 30.00, 'wipes.png', 'hygiene', 120); 