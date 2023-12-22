import { Request, Response, NextFunction } from "express";
import { body, check, validationResult } from "express-validator";

export const validateSignin = (req: Request, res: Response, next: NextFunction) => {
    body('email').notEmpty().trim();
    body('password').notEmpty().trim();
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    next();
};

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    body('email').notEmpty().isEmail().trim();
    body('password').notEmpty().trim();
    body('username').notEmpty().trim();
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    next();
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    check('userId').notEmpty().trim();
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    next();
};