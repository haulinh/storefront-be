import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyAuthToken = (req: Request, res: Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SECRET as Secret);
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json("You are not authorized to access this resource");
  }
};
