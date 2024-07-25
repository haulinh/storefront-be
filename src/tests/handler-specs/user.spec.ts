import request from "supertest";
import app from "../../server"; // Adjust this import to your Express app
import { User } from "../../models/user";

describe("User Routes", () => {
  let user: User;
  let token: string;

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

  it("should return a single user", async () => {
    console.log("token", token);

    const response = await request(app)
      .get(`/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`); // Assuming there's a user with id 1
    expect(response.status).toBe(200);
  });

  it("should create a new user", async () => {
    const newUser = {
      username: "testUser",
      password: "password123",
      // Add other required fields
      firstName: "linh",
      lastName: "le",
    };
    const response = await request(app).post("/users").send(newUser);

    expect(response.status).toBe(201);
  });

  it("should authenticate a user and return a token", async () => {
    const userCredentials = {
      username: "linhle",
      password: "123456",
    };
    const response = await request(app).post("/login").send(userCredentials);

    expect(response.status).toBe(200);
    // Assuming your login route returns a token on successful authentication
  });
});
