import client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sqlQuery = "SELECT * FROM products";
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch {
      throw new Error("Error fetching products");
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connection = await client.connect();
      const sqlQuery = "SELECT * FROM products WHERE id = $1";
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch {
      throw new Error("Error fetching product");
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sqlQuery =
        "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
      const result = await connection.query(sqlQuery, [
        product.name,
        product.price,
      ]);
      connection.release();
      return result.rows[0];
    } catch {
      throw new Error("Error creating product");
    }
  }
}
