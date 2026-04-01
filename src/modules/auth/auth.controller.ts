import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const signup =asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  
    const user = await authService.signupService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
})

export const login =asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  
    const result = await authService.loginService(req.body);

    res
  .cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000 // 15 min
  })
  .cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
  .status(200)
  .json({
    success: true,
    message: "Login successful"
  });
  
})


export const refreshToken =asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  
    const token = req.cookies.refreshToken;
    if(!token){
      throw new Error("Unauthorized");
    }
    const result = await authService.refreshTokenService(token);

    res
  .cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000 // 15 min
  })
  .cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
    res.status(200).json({
      success: true,
      message: "Token refreshed"
    });
  
});