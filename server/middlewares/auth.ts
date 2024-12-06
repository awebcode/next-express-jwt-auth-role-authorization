import type { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "./errors";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { ROLE } from "@prisma/client";
interface UserWithJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ErrorHandler(401, "Unauthorized");
    }
    const payload = jwt.verify(token, "secret") as UserWithJwtPayload;

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const rolesMiddleware = (roles: ROLE) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorHandler(403, "You are not permitted to access this route");
    }
    next();
  };
};
