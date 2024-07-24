import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import { verifyAuthToken } from "../helper";

const dashboardQueries = new DashboardQueries();

export const orderByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orders = await dashboardQueries.ordersByUser(id);
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const dashboardRoutes = (app: express.Application) => {
  app.get("/orders/user/:id", verifyAuthToken, orderByUser);
};
