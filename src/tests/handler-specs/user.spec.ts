import request from "supertest";
import app from "../../server"; // Adjust this import to your Express app

describe("User Routes", () => {
  describe("GET /users/:id", () => {
    it("should return a single user", async () => {
      const response = await request(app).get("/users/1"); // Assuming there's a user with id 1
      expect(response.status).toBe(200);
    });
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = {
        username: "testUser",
        password: "password123",
        // Add other required fields
      };
      const response = await request(app).post("/users").send(newUser);

      expect(response.status).toBe(201);
    });
  });

  describe("POST /users/login", () => {
    it("should authenticate a user and return a token", async () => {
      const userCredentials = {
        username: "testUser",
        password: "password123",
      };
      const response = await request(app)
        .post("/users/login")
        .send(userCredentials);

      expect(response.status).toBe(200);
      // Assuming your login route returns a token on successful authentication
    });
  });
});
