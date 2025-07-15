import { isValidObjectId } from "mongoose";
import { NextFunction, Request, Response } from 'express';

function checkId(req: Request, res: Response, next: NextFunction) {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    next();
}

export default checkId;