import express, { Request, Response } from "express";
import { OrderModel } from "../models/order";
import { verifyAuthToken } from "../helper";

const orderModel = new OrderModel();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await orderModel.index();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const order = await orderModel.show(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = req.body;
    const newOrder = await orderModel.create(order);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addProductToOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId, productId, quantity } = req.body;
    const order = await orderModel.addProductToOrder(
      orderId,
      productId,
      quantity
    );
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/product", verifyAuthToken, addProductToOrder);
};
