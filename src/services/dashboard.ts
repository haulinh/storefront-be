import client from "../database";
import { Order } from "../models/order";

export class DashboardQueries {
  // Get all products that have been included in orders

  async ordersByUser(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders 
        INNER JOIN order_products on orders.id = order_products.order_id
        INNER JOIN products on order_products.product_id = products.id
        WHERE user_id=($1)`;

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get orders by user: ${err}`);
    }
  }
}
