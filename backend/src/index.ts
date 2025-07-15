import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

// Files
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import genreRoutes from './routes/genreRoutes';
import movieRoutes from './routes/movieRoutes';
import uploadRoutes from './routes/uploadRoutes';
import swaggerDocs from './docs/swagger';
import movieRequestRoutes from './routes/movieRequestRoutes';

// Configuration
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://movie-app-frontend-wzq8.onrender.com'], // Add your deployed frontend URL
  credentials: true
}));app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/genre', genreRoutes)
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/uploads', uploadRoutes);
app.use('/api/v1/requests', movieRequestRoutes);;

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Swagger documentation
swaggerDocs(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});