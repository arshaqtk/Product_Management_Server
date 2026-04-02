import { User } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "./auth.validator";
import { env } from "../../config/env";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/token";

export const signupService = async (data:signupSchema) => {
  const { name, email, password } = data;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return user;
};

export const loginService = async (data:loginSchema) => {
  const { email, password } = data;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({ id: user._id.toString(),email:user.email });
  const refreshToken = generateRefreshToken({ id: user._id.toString(),email:user.email});

  return { user, accessToken, refreshToken };
};

export const refreshTokenService  = async (token:string)=>{
  const decodedToken = verifyRefreshToken(token);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const accessToken = generateAccessToken({ id: user._id.toString(),email:user.email });
  const refreshToken = generateRefreshToken({ id: user._id.toString(),email:user.email});
  return { user, accessToken, refreshToken };
}

export const getMeService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};