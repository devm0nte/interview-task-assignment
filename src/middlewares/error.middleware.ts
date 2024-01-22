import { NextFunction, Request, Response } from "express";
import { handlePrismaError } from "../utils/error/prismaErrorHandling.utils";
import { Prisma } from "@prisma/client";
import HttpException from "../utils/httpException.util";

const sendError = (error: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, data } = error;
    let message = error.message;
    console.log(`[Error] ${error}`);

    message = status === 500 || !message ? "Internal server error" : message;
    error = {
        type: "error",
        status,
        message,
        // data
    };

    res.status(status).send(error);
};

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    let err = error;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("handlePrismaError");
        err = handlePrismaError(error);
    } else if (error instanceof Prisma.PrismaClientValidationError) {
        err = new HttpException(400, "Bad request.");
    } else if (error.name === "JsonWebTokenError") {
        err = new HttpException(400, "Invalid token.");
    } else if (error.name === "TokenExpiredError") {
        err = new HttpException(400, "Token has expired.");
    }
    sendError(err, req, res, next);
};
export default errorMiddleware;
