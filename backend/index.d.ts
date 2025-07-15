import * as express from 'express';
import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: mongoose.Types.ObjectId;
        username: string;
        email: string;
        isAdmin: boolean;
      } & mongoose.Document;
    }
  }
}
