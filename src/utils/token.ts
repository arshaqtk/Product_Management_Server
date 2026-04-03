import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { JwtPayload } from "../types/jwt";
const ACCESS_EXPIRES_IN = env.ACCESS_EXPIRES_IN as SignOptions["expiresIn"];
const REFRESH_EXPIRES_IN = env.REFRESH_EXPIRES_IN as SignOptions["expiresIn"];


// Generate Access Token
export const generateAccessToken = (payload: JwtPayload):string => {
  return jwt.sign(payload, env.ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });
};

// Generate Refresh Token
export const generateRefreshToken = (payload: JwtPayload):string => {
  return jwt.sign(payload, env.REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
};

// Verify Access Token 
export const verifyAccessToken = (token: string):JwtPayload => {
  const decoded = jwt.verify(token, env.ACCESS_SECRET);
  return decoded as JwtPayload;
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string):JwtPayload => {
  const decoded = jwt.verify(token, env.REFRESH_SECRET);
  return decoded as JwtPayload;
};
