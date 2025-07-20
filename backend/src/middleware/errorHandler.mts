import { NextFunction, Response, Request } from "express";
import AppError from "./class/AppError.mjs";

 const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const response = {
        success: false,
        message: err.message || 'Internal Server Error',
        statusCode: err.statusCode || 500,
        details: err.details || null,
    };

    return res.status(response.statusCode).json(response);
}

export default errorHandler;


