# Reactive Web Marketplace - Backend API

This is the backend API for the Reactive Web Marketplace built with Node.js, Express, and MongoDB using MVC architecture.

## 🏗️ Architecture

The backend follows the **MVC (Model-View-Controller)** pattern:

- **Models**: Database schemas and business logic
- **Controllers**: Request handling and response logic
- **Routes**: API endpoint definitions
- **Middleware**: Error handling, authentication, etc.

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── userController.js    # User CRUD operations
│   └── productController.js # Product CRUD operations
├── middleware/
│   └── errorHandler.js      # Error handling middleware
├── models/
│   ├── User.js             # User schema
│   └── Product.js          # Product schema
├── routes/
│   ├── userRoutes.js       # User API routes
│   └── productRoutes.js    # Product API routes
├── server.js               # Main server file
├── env.example             # Environment variables template
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. **Install dependencies** (from project root):
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp backend/env.example backend/.env
   ```
   
   Edit `backend/.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/Reactive_Web_Marketplace
   ```

3. **Start MongoDB**:
   Make sure MongoDB is running on `localhost:27017`

4. **Start the server**:
   ```bash
   # Development mode with auto-restart
   npm run dev:server
   
   # Production mode
   npm run server
   ```

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products (with pagination, filtering, search)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🔧 Features

- **MongoDB Integration**: Connected to local MongoDB instance
- **RESTful API**: Full CRUD operations for users and products
- **Error Handling**: Comprehensive error handling middleware
- **Security**: Helmet.js for security headers
- **CORS**: Cross-origin resource sharing enabled
- **Logging**: Morgan for HTTP request logging
- **Environment Variables**: Configurable via .env file
- **Pagination**: Built-in pagination for product listings
- **Search & Filtering**: Text search and category filtering
- **Validation**: Mongoose schema validation

## 🛠️ Development

### Available Scripts

- `npm run server` - Start production server
- `npm run dev:server` - Start development server with nodemon

### Database Connection

The server automatically connects to MongoDB on startup. You'll see:
```
✅ MongoDB Connected Successfully!
📊 Database: Reactive_Web_Marketplace
🌐 Host: localhost
🔌 Port: 27017
```

### Error Handling

The API includes comprehensive error handling for:
- Invalid ObjectIds
- Duplicate key errors
- Validation errors
- Not found routes
- Server errors

## 🔒 Security

- Helmet.js for security headers
- CORS configuration
- Input validation
- Error message sanitization

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/Reactive_Web_Marketplace |

## 🤝 Contributing

1. Follow the MVC architecture pattern
2. Add proper error handling
3. Include input validation
4. Write clear API documentation
5. Test all endpoints

## 📄 License

This project is part of the Reactive Web Marketplace.

## User Registration

The user registration system stores user data in the `user_registration` collection in MongoDB with the following fields:

- **firstName** (required): User's first name
- **lastName** (required): User's last name  
- **email** (required, unique): User's email address
- **password** (required, min 6 characters): User's password
- **role** (optional): User role (default: 'user')
- **isActive** (optional): Account status (default: true)
- **createdAt** (auto-generated): Registration timestamp
- **updatedAt** (auto-generated): Last update timestamp

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Copy `env.example` to `.env`
   - Update the MongoDB URI if needed:
     ```
     MONGODB_URI=mongodb://localhost:27017/Reactive_Web_Marketplace
     ```

3. **Start MongoDB**
   - Ensure MongoDB is running on your system
   - The default connection is to `mongodb://localhost:27017/Reactive_Web_Marketplace`

4. **Start the Server**
   ```bash
   # Development mode with auto-restart
   npm run dev:server
   
   # Production mode
   npm run server
   ```

5. **Test Database Connection**
   ```bash
   npm run test:db
   ```

## API Endpoints

### User Registration
- **POST** `/api/users` - Register a new user
  - Body: `{ firstName, lastName, email, password }`
  - Returns: User data (without password)

### User Management
- **GET** `/api/users` - Get all users (Admin only)
- **GET** `/api/users/:id` - Get single user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Health Check
- **GET** `/api/health` - Server health status

## Frontend Integration

The frontend SignupPage component is configured to:
1. Validate form data (required fields, password match, terms agreement)
2. Send POST request to `http://localhost:5000/api/users`
3. Handle success/error responses
4. Navigate to login page on successful registration
5. Display error messages for validation failures

## Testing

1. **Database Test**
   ```bash
   npm run test:db
   ```

2. **Manual API Test**
   ```bash
   curl -X POST http://localhost:5000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "John",
       "lastName": "Doe", 
       "email": "john@example.com",
       "password": "password123"
     }'
   ```

## Security Notes

- Passwords are currently stored in plain text (should be hashed in production)
- CORS is enabled for development (configure properly for production)
- Input validation is implemented on both frontend and backend
- Email uniqueness is enforced at the database level

## Development

- Server runs on port 5000 by default
- MongoDB connection is established on server startup
- Error handling middleware is configured
- Logging is enabled for development 