import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const validateJwt = (req: Request, res:Response, next: NextFunction) => {
    if (!req.headers["authorization"]) return res.status(400).send({auth: false, description: "No header provided"});
    const token = req.headers["authorization"].split(" ")[1]
    if (!token) return res.status(400).send({auth: false, description: "No token provided"});
    if (!process.env.JWT_KEY) return res.status(400).send({auth: false, description: "No secret key in .env"});
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) res.status(400).send({auth: false, description: "Token not valid"});
        next()
    });
};