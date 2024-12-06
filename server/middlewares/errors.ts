import type { Request, Response, NextFunction } from "express";

// Custom Error Handler Class
export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

  // Static method to handle the error response
  static handleError(res: Response, err: ErrorHandler) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

// Middleware: Not Found
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorHandler(404, "Not Found");
  next(error);
};

// Middleware: Global Error Handler
export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ErrorHandler.handleError(res, err);
};
