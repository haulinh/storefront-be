import request from "supertest";
import app from "../../server"; // Import your Express application here
import { User } from "../../models/user";

describe("Product Routes", () => {
  let token: string;
  let user: User;
  beforeAll(async () => {
    const userResponse = await request(app).post("/users").send({
      username: "linhle",
      password: "123456",
      firstName: "linh",
      lastName: "le",
    });

    user = userResponse.body;

    const loginResponse = await request(app).post("/login").send({
      username: "linhle",
      password: "123456",
    });
    token = loginResponse.body;
  });

  describe("GET /products", () => {
    it("should return a list of products", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /products/:id", () => {
    it("should return a single product", async () => {
      // Assuming there's a product with id 1 for testing
      const response = await request(app).get("/products/1");
      expect(response.status).toBe(200);
    });
  });

  describe("POST /products", () => {
    it("should create a new product", async () => {
      const newProduct = {
        name: "Test Product",
        price: 10,
      };
      const response = await request(app)
        .post("/products")
        .send(newProduct)
        .set("Authorization", `Bearer ${token}`); // Set this to a valid token

      expect(response.status).toBe(201);
    });
  });
});
