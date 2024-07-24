import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { UserModel } from "../models/user";
import { verifyAuthToken } from "../helper";

const userModel = new UserModel();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userModel.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const user = await userModel.show(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body;
    const newUser = await userModel.create(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body;
    const loginUser = await userModel.authenticate(
      user.username,
      user.password
    );
    const token = jwt.sign({ loginUser }, process.env.TOKEN_SECRET as string);
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.post("/login", login);
};
