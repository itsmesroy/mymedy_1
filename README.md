# My Medy - Menstrual Care E-commerce Platform

My Medy is a comprehensive e-commerce platform for menstrual care products, featuring a period calculator and secure payment processing.

## Features

- Product catalog with categories (pads, tampons, hygiene products)
- Shopping cart functionality
- Secure checkout with Stripe integration
- Period calculator tool
- User authentication and account management
- Responsive design for all devices
- Order tracking and history

## Tech Stack

- Frontend: React.js with Bootstrap for UI
- Backend: Node.js with Express
- Database: MySQL (Hostinger)
- Payment Processing: Stripe
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- Stripe account for payment processing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my_medy.git
cd my_medy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
DB_HOST=your_hostinger_host
DB_USER=your_hostinger_username
DB_PASSWORD=your_hostinger_password
DB_NAME=my_medy_db
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Set up the database:
- Create a new database in your Hostinger MySQL panel
- Import the `database.sql` file to create tables and sample data

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
my_medy/
├── src/
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── assets/          # Images and static files
│   └── App.jsx          # Main application component
├── server.js           # Express server
├── database.sql        # Database schema
└── package.json        # Project dependencies
```

## API Endpoints

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- GET `/api/products/category/:category` - Get products by category

### Authentication
- POST `/api/register` - Register new user
- POST `/api/login` - User login

### Orders
- POST `/api/orders` - Create new order
- GET `/api/orders/:userId` - Get user's orders
- GET `/api/orders/:orderId` - Get order details

### Period Calculator
- POST `/api/calculate-period` - Calculate next period dates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Stripe](https://stripe.com) for payment processing
- [Bootstrap](https://getbootstrap.com) for UI components
- [React Router](https://reactrouter.com) for routing
