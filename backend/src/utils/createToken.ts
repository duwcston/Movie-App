import { Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const createToken = (res: Response, userId: mongoose.Types.ObjectId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as jwt.PrivateKey, {
        expiresIn: '30d',
    });

    // Set the JWT as a HTTP-Only Cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return token;
}

export default createToken;