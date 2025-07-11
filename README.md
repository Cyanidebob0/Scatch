# Scatch - E-commerce Platform

Scatch is a full-stack e-commerce platform built with Node.js, Express, MongoDB, and EJS. It provides a complete solution for online shopping with user authentication, product management, and owner dashboards.

## Features

- **User Authentication**

  - Secure registration and login
  - Session management
  - Role-based access control

- **Product Management**

  - Add/Edit/Delete products
  - Product categorization
  - Image uploads

- **Shopping Experience**

  - Product browsing
  - Shopping cart functionality
  - Order processing

- **Admin Dashboard**
  - User management
  - Sales analytics
  - Inventory management

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer
- **Environment Management**: dotenv, config

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd scatch
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EXPRESS_SESSION_SECRET=your_session_secret
   ```

4. For production, update the configuration in `config/production.json`

## Project Structure

```
scatch/
├── config/               # Configuration files
│   ├── development.json  # Development environment config
│   ├── production.json   # Production environment config
│   ├── mongoose-connection.js  # Database connection
│   └── multer-config.js  # File upload configuration
├── controllers/          # Route controllers
├── middlewares/          # Custom middleware
├── models/               # MongoDB models
├── public/               # Static files
│   ├── css/
│   ├── js/
│   └── uploads/
├── routes/               # Route definitions
├── views/                # EJS templates
├── app.js                # Main application file
└── package.json
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run prod
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `GET /users/logout` - User logout

### Products

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Create new product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

## Environment Configuration

The application uses the `config` package for environment-specific configurations.

- `development.json` - Development environment settings
- `production.json` - Production environment settings

## Security

- Password hashing using bcrypt
- JWT for authentication
- Secure session management
- Environment variables for sensitive data
- CSRF protection
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.
