import {body, validationResult} from "express-validator";
import { Request, Response, NextFunction } from "express";

export const dataValidation = [
    body("userName").exists().isLength({ min: 3, max: 10 }),
    body("password").exists().isAlphanumeric().isLength({ min: 6, max: 16 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors) return res.status(400).json({errors: errors.array()});
        next();
    }];


