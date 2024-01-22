import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validatorHandler = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(422).json({
                type: "error",
                status: 422,
                message: "Validation failed",
                errors: error.array(),
            });
            return;
        }
        next();
    };
};
