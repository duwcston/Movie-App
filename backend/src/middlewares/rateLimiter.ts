import { NextFunction, Response, Request } from 'express';
import { redisClient } from '../config/redis';

export const rateLimiter = (maxRequests: number, windowMs: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `rate_limit:${req.ip}`;
      const current = await redisClient.get(key);
      
      if (current === null) {
        await redisClient.setEx(key, Math.ceil(windowMs / 1000), '1');
        return next();
      }
      
      if (parseInt(current) >= maxRequests) {
        return res.status(429).json({
          error: 'Too many requests, please try again later'
        });
      }
      
      await redisClient.incr(key);
      next();
    } catch (error) {
      console.error('Rate limiter error:', error);
      next(); // Continue on Redis error
    }
  };
};