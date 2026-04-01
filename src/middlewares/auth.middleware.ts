import { verifyAccessToken } from "../utils/token";
import { Request, Response, NextFunction } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyAccessToken(token);

  req.user = decoded;

  next();
};