import express, { Request, Response } from "express";
import { ProductModel } from "../models";
import { verifyAuthToken } from "../helper";

const productModel = new ProductModel();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productModel.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const product = await productModel.show(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = req.body;
    const newProduct = await productModel.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
};
