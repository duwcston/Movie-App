# 🎬 Movie Streaming Application

A full-stack video streaming web application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) with **TypeScript** and exploring **data crawling techniques** for content aggregation.

## 🎯 Project Purpose & Learning Objectives

This project serves as a comprehensive learning platform for:

### **MERN Stack Development with TypeScript**

-   **MongoDB**: Database design, schema modeling, and data relationships
-   **Express.js**: RESTful API development, middleware implementation, and server architecture
-   **React**: Component-based UI development, state management with Redux Toolkit, and modern hooks
-   **Node.js**: Server-side JavaScript, TypeScript integration, and package management

### **Data Crawling & Web Scraping**

-   Learning web scraping techniques to gather movie/video content data
-   Understanding data extraction, cleaning, and normalization processes
-   Implementing automated data collection pipelines
-   Working with external APIs for content metadata

### **Full-Stack Integration**

-   Connecting frontend and backend seamlessly with type safety
-   Authentication and authorization implementation with JWT
-   Real-time data updates and user interactions
-   Deployment and production considerations

## 🚀 Features & Functionality

### **Current Features**

-   ✅ User authentication system (register, login, logout)
-   ✅ JWT-based secure session management
-   ✅ Modern responsive UI with Tailwind CSS v4
-   ✅ Component-based React 19 architecture
-   ✅ Movie search and discovery
-   ✅ Admin movie management dashboard
-   ✅ Rating and review system
-   ✅ Movie request system for users
-   ✅ Video streaming capabilities

### **Planned Features**

-   🔄 User watchlists and favorites
-   🔄 Movie recommendations AI system
-   🔄 Enhanced user profiles
-   🔄 Movie request status for each user
-   🔄 Data crawling for content aggregation

## 🛠 Tech Stack

### **Frontend**

-   **React 19** with TypeScript
-   **Vite** for fast development and building
-   **Tailwind CSS** for styling and responsive design
-   **Redux Toolkit** for state management
-   **React Router** for navigation
-   **React Slick** for carousels and sliders
-   **React Toastify** for notifications

### **Backend**

-   **Node.js** with Express.js 5 framework
-   **TypeScript** for type safety
-   **MongoDB** with Mongoose 8 ODM
-   **JWT** for authentication
-   **bcryptjs** for password hashing
-   **Multer** for file uploads
-   **Swagger/OpenAPI** for API documentation
-   **Cookie Parser** for session management

### **Development Tools**

-   **TypeScript 5.8+** for type safety across the stack
-   **ESLint 9** for code quality
-   **TSX** for TypeScript execution with watch mode
-   **Vite** for frontend development server

## 📁 Project Structure

```
movie-application/
├── README.md                    # Project documentation
├── TODO.md                      # Development roadmap
├── backend/                     # Express.js API server with TypeScript
│   ├── package.json            # Backend dependencies and scripts
│   ├── tsconfig.json           # TypeScript configuration
│   ├── src/
│   │   ├── index.ts            # Server entry point
│   │   ├── config/             # Database and app configuration
│   │   ├── controllers/        # Business logic handlers
│   │   ├── docs/               # API documentation (Swagger)
│   │   ├── middlewares/        # Custom middleware functions
│   │   ├── models/             # MongoDB data models
│   │   ├── routes/             # API route definitions
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Helper functions
│   └── uploads/                # Uploaded files storage
└── frontend/                    # React application with TypeScript
    ├── package.json            # Frontend dependencies and scripts
    ├── tsconfig.json           # TypeScript configuration
    ├── vite.config.ts          # Vite configuration
    ├── public/                 # Static assets
    └── src/
        ├── App.tsx             # Root component
        ├── main.tsx            # Entry point
        ├── components/         # Reusable UI components
        ├── pages/              # Page components
        │   ├── Admin/          # Admin dashboard pages
        │   ├── Auth/           # Authentication pages
        │   ├── Movies/         # Movie-related pages
        │   └── User/           # User profile pages
        ├── redux/              # Redux state management
        │   ├── api/            # API integration
        │   └── features/       # Redux slices
        ├── assets/             # Static assets
        ├── hooks/              # Custom React hooks
        └── types/              # TypeScript type definitions
```

## 🚦 Getting Started

### **Prerequisites**

-   Node.js (v18 or higher)
-   MongoDB (local installation or MongoDB Atlas)
-   npm or pnpm package manager

### **Environment Setup**

1. Clone the repository
2. Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### **Installation & Running**

```powershell
# Install and run backend
cd backend
npm install
npm run dev      # Start development server with TSX watch

# In another terminal, install and run frontend
cd frontend
npm install
npm run dev      # Starts Vite dev server

# For production build:
cd backend
npm run build    # Compile TypeScript
npm run start    # Run compiled JS

cd frontend
npm run build    # Build production frontend
```

## 📚 Learning Progress & Milestones

### **Phase 1: Foundation** ✅

-   [x] Project setup and folder structure
-   [x] Express.js server with TypeScript configuration
-   [x] MongoDB connection and User model
-   [x] JWT authentication system
-   [x] React 19 app with TypeScript setup
-   [x] Tailwind CSS v4 styling system

### **Phase 2: Core Features** ✅

-   [x] Movie data model and API implementation
-   [x] Search functionality with filters
-   [x] User interface components and pages
-   [x] State management with Redux Toolkit
-   [x] Admin dashboard for content management
-   [x] User movie request system

### **Phase 3: Advanced Features** �

-   [x] API documentation with Swagger
-   [x] Rating and review system
-   [ ] User watchlist and favorites
-   [ ] Performance optimization and caching
-   [ ] Configure Docker containers
-   [ ] Testing and deployment

## 🎓 Learning Resources & References

### **MERN Stack with TypeScript**

-   [MongoDB Documentation](https://docs.mongodb.com/)
-   [Express.js Guide](https://expressjs.com/)
-   [React 19 Documentation](https://react.dev/)
-   [Node.js Documentation](https://nodejs.org/)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### **Data Crawling & APIs**

-   [Puppeteer for Web Scraping](https://pptr.dev/)
-   [Cheerio for HTML Parsing](https://cheerio.js.org/)
-   [TMDB API](https://www.themoviedb.org/documentation/api)

### **Modern Frontend Development**

-   [Vite Documentation](https://vitejs.dev/guide/)
-   [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
-   [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
-   [React Router v7 Documentation](https://reactrouter.com/en/main)

## 🤝 Contributing & Development

This is a learning project!

### **Development Workflow**

1. Check the `TODO.md` for current tasks
2. Create feature branches for new functionality
3. Follow the existing code structure and TypeScript conventions
4. Ensure type safety across the codebase
5. Test changes before committing

## 📄 License

This project is created for educational purposes!

---

## 🎯 Current Focus (July 2025)

**Learning Objective**: Building a complete understanding of full-stack TypeScript web development while creating a functional video streaming platform.

**Next Steps**:

1. Complete the user watchlist and favorites feature
2. Explore data crawling for content aggregation
3. Add Redis for caching and performance optimization

_This project represents a journey through modern web development technologies and practices. Each feature implemented contributes to a deeper understanding of the MERN stack ecosystem with TypeScript._
