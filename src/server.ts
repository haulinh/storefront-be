import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import {
  dashboardRoutes,
  orderRoutes,
  productRoutes,
  userRoutes,
} from "./handlers";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", async function (req: Request, res: Response) {});

productRoutes(app);
userRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
