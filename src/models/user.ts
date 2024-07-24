import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export class UserModel {
  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sqlQuery =
        "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *";

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);

      const result = await connection.query(sqlQuery, [
        user.firstName,
        user.lastName,
        user.username,
        hash,
      ]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating user. ${error}`);
    }
  }

  async index(): Promise<User[]> {
    const connection = await client.connect();
    const sqlQuery = "SELECT * FROM users";
    const result = await connection.query(sqlQuery);
    connection.release();
    return result.rows;
  }

  async show(id: string): Promise<User> {
    const connection = await client.connect();
    const sqlQuery = "SELECT * FROM users WHERE id=($1)";
    const result = await connection.query(sqlQuery, [id]);
    connection.release();
    return result.rows[0];
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<User | null | undefined> {
    try {
      const connection = await client.connect();
      const sqlQuery = "SELECT * FROM users WHERE username=($1)";
      const result = await connection.query(sqlQuery, [username]);
      connection.release();
      const user = result.rows[0];
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
      }
      throw new Error("Invalid username or password");
    } catch (error) {
      throw new Error(`Error authenticating user. ${error}`);
    }
  }
}
