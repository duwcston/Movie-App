import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from './asyncHandler.js';
import { NextFunction, Request, Response } from 'express';

// Define interface for JWT payload
interface DecodedToken extends JwtPayload {
  id: string;
}

// Check if the user is authenticated
const authenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt

    if (token) {
        try {
            // Verify the token
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
})

// Check if the user is an admin
const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
}

export { authenticated, authorizeAdmin };