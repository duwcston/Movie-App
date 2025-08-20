import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import userRoutes from './routes/userRoutes';
import genreRoutes from './routes/genreRoutes';
import movieRoutes from './routes/movieRoutes';
import uploadRoutes from './routes/uploadRoutes';
import movieRequestRoutes from './routes/movieRequestRoutes';

// Config
import connectDB from './config/db';
import swaggerDocs from './config/swagger';
import { connectRedisClient } from './config/redis';
import { rateLimiter } from './middlewares/rateLimiter';

// Configuration
dotenv.config();
connectDB();
connectRedisClient()

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'], // Add deployed frontend URL
  credentials: true
}));
app.use(rateLimiter(100, 15 * 60 * 1000)); // 100 requests per 15 minutes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/genre', genreRoutes)
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/uploads', uploadRoutes);
app.use('/api/v1/requests', movieRequestRoutes);

// Swagger documentation
swaggerDocs(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});