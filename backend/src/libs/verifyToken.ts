import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "./errorHandling";

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
    role: 'super_administrator' | 'administrator' | 'moderator' | 'user';
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('auth-token');
    if(!token) throw new AuthenticationError('Acces Denied');

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'defaultToken') as IPayload;
    req.userId = payload._id;

    next();
};