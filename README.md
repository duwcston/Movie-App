# 🎬 Movie Streaming Application

A full-stack video streaming web application built to learn the **MERN Stack** (MongoDB, Express.js, React, Node.js) and explore **data crawling techniques** for content aggregation.

## 🎯 Project Purpose & Learning Objectives

This project serves as a comprehensive learning platform for:

### **MERN Stack Development**
- **MongoDB**: Database design, schema modeling, and data relationships
- **Express.js**: RESTful API development, middleware implementation, and server architecture
- **React**: Component-based UI development, state management with Redux, and modern hooks
- **Node.js**: Server-side JavaScript, async programming, and package management

### **Data Crawling & Web Scraping**
- Learning web scraping techniques to gather movie/video content data
- Understanding data extraction, cleaning, and normalization processes
- Implementing automated data collection pipelines
- Working with external APIs for content metadata

### **Full-Stack Integration**
- Connecting frontend and backend seamlessly
- Authentication and authorization implementation
- Real-time data updates and user interactions
- Deployment and production considerations

## 🚀 Features & Functionality

### **Current Features**
- ✅ User authentication system (register, login, logout)
- ✅ JWT-based secure session management
- ✅ Modern responsive UI with Tailwind CSS
- ✅ Component-based React architecture

### **Planned Features**
- 🔄 Movie search and discovery
- 🔄 Video streaming capabilities
- 🔄 User watchlists and favorites
- 🔄 Movie recommendations system
- 🔄 Rating and review system
- 🔄 Admin content management
- 🔄 Data crawling for content aggregation

## 🛠 Tech Stack

### **Frontend**
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling and responsive design
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Slick** for carousels and sliders

### **Backend**
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Cookie Parser** for session management

### **Development Tools**
- **TypeScript** for type safety
- **ESLint** for code quality
- **Nodemon** for development server
- **Concurrently** for running frontend/backend together

## 📁 Project Structure

```
movie-application/
├── package.json                 # Root dependencies and scripts
├── README.md                    # Project documentation
├── TODO.md                     # Development roadmap
├── .gitignore                  # Git ignore rules
├── backend/                    # Express.js API server
│   ├── index.js               # Server entry point
│   ├── config/                # Database and app configuration
│   ├── controllers/           # Business logic handlers
│   ├── middlewares/           # Custom middleware functions
│   ├── models/               # MongoDB data models
│   ├── routes/               # API route definitions
│   └── utils/                # Helper functions
└── frontend/                  # React application
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── pages/           # Page components
    │   ├── store/           # Redux store configuration
    │   └── utils/           # Frontend utilities
    ├── public/              # Static assets
    └── dist/               # Production build
```

## 🚦 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### **Environment Setup**
1. Clone the repository
2. Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### **Installation & Running**
```powershell
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Run both frontend and backend concurrently
npm run fullstack

# Or run them separately:
npm run backend    # Starts Express server on port 3000
npm run frontend   # Starts Vite dev server on port 5173
```

## 📚 Learning Progress & Milestones

### **Phase 1: Foundation** ✅
- [x] Project setup and folder structure
- [x] Basic Express.js server configuration
- [x] MongoDB connection and User model
- [x] JWT authentication system
- [x] React app with TypeScript setup
- [x] Tailwind CSS styling system

### **Phase 2: Core Features** 🔄
- [x] Movie data model and API integration
- [ ] Search functionality implementation
- [ ] Video streaming capabilities
- [ ] User interface components
- [x] State management with Redux

### **Phase 3: Advanced Features** 📋
- [ ] Data crawling implementation
- [ ] Content recommendation engine
- [ ] Advanced user features
- [ ] Performance optimization
- [ ] Testing and deployment

## 🎓 Learning Resources & References

### **MERN Stack**
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/)

### **Data Crawling & APIs**
- [Puppeteer for Web Scraping](https://pptr.dev/)
- [Cheerio for HTML Parsing](https://cheerio.js.org/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [OMDB API](http://www.omdbapi.com/)

### **Tutorials**
- [MERN Mastery: Building a Scalable Movies App for Ultimate User Experience](https://www.youtube.com/watch?v=Bd1EBSCu2os) by HuXn WebDev
- [React JS 19 Full Course 2025 | Build an App and Master React in 2 Hours](https://www.youtube.com/watch?v=dCLhUialKPQ&t=4098s) by JavaScript Mastery

## 🤝 Contributing & Development

This is a learning project!

### **Development Workflow**
1. Check the `TODO.md` for current tasks
2. Create feature branches for new functionality
3. Follow the existing code structure and conventions
4. Test changes before committing

## 📄 License

This project is created for educational purposes!

---

## 🎯 Current Focus

**Learning Objective**: Building a complete understanding of full-stack web development while creating a functional video streaming platform.

**Next Steps**: Implementing movie data integration and search functionality to make the application interactive and functional.

*This project represents a journey through modern web development technologies and practices. Each feature implemented contributes to a deeper understanding of the MERN stack ecosystem.*