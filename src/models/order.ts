import client from "../database";

export type Order = {
  id: number;
  user_id: number;
  status: string;
};

export class OrderModel {
  async create(order: Order): Promise<Order> {
    const connection = await client.connect();
    const sqlQuery =
      "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
    const result = await connection.query(sqlQuery, [
      order.user_id,
      order.status,
    ]);
    connection.release();
    return result.rows[0];
  }

  async index(): Promise<Order[]> {
    const connection = await client.connect();
    const sqlQuery = "SELECT * FROM orders";
    const result = await connection.query(sqlQuery);
    connection.release();
    return result.rows;
  }

  async show(id: string): Promise<Order> {
    const connection = await client.connect();
    const sqlQuery = "SELECT * FROM orders WHERE id=($1)";
    const result = await connection.query(sqlQuery, [id]);
    connection.release();
    return result.rows[0];
  }

  async addProductToOrder(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<Order> {
    const connection = await client.connect();
    const sqlQuery =
      "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
    const result = await connection.query(sqlQuery, [
      orderId,
      productId,
      quantity,
    ]);

    connection.release();
    return result.rows[0];
  }
}
