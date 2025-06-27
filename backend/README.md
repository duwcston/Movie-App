# Movie Application Backend

This is the backend server for the Movie Application, built with Node.js, Express.js, and MongoDB.

## 📁 Project Structure

```
backend/
├── index.js              # Main server entry point
├── config/
│   └── db.js             # Database connection configuration
├── controllers/
│   └── userController.js # User-related business logic
├── middlewares/
│   ├── asyncHandler.js   # Async error handling middleware
│   └── authMiddleware.js # Authentication middleware
├── models/
│   └── User.js           # User data model/schema
├── routes/
│   └── userRoutes.js     # User API routes definition
└── utils/
    └── createToken.js    # JWT token utility functions
```

## 📂 Folder Descriptions

### `config/`
Contains configuration files for the application:
- **`db.js`**: MongoDB database connection setup using Mongoose

### `controllers/`
Contains business logic and request handlers:
- **`userController.js`**: Handles user-related operations (registration, login, profile management)

### `middlewares/`
Contains Express middleware functions:
- **`asyncHandler.js`**: Wraps async functions to handle errors automatically
- **`authMiddleware.js`**: Authentication middleware to protect routes and verify JWT tokens

### `models/`
Contains MongoDB/Mongoose data models:
- **`User.js`**: User schema definition with fields like username, email, password, and timestamps

### `routes/`
Contains API route definitions:
- **`userRoutes.js`**: Defines all user-related API endpoints (POST, GET, PUT, DELETE)

### `utils/`
Contains utility functions and helpers:
- **`createToken.js`**: JWT token generation and management utilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Environment Variables
Create a `.env` file in the root directory with:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

### Installation
```bash
# Install dependencies
npm install

# Start the backend server
npm run backend

# Or start both frontend and backend
npm run fullstack
```

## 🛠 Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **cookie-parser**: Cookie parsing middleware
- **dotenv**: Environment variable management

## 📡 API Structure

The backend follows a RESTful API structure with:
- Authentication-based user management
- Middleware for error handling and authentication
- Modular route organization
- Secure password hashing and JWT token management

## 🔧 Development

The server runs on port 3000 by default and includes:
- Automatic restart with nodemon during development
- CORS support
- JSON and URL-encoded request parsing
- Cookie parsing for session management

---

*This backend serves as the API layer for the Movie Application frontend built with React and TypeScript.*