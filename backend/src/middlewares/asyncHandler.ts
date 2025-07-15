import { NextFunction, Request, Response } from "express";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next))
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
}

export default asyncHandler;