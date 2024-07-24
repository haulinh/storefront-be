import supertest from "supertest";
import app from "../../server"; // Adjust this import to the actual path of your Express app
import { User } from "../../models/user";

const request = supertest(app);

describe("Order Routes", () => {
  let token: string;
  let user: User;

  beforeAll(async () => {
    const userResponse = await request.post("/users").send({
      username: "linhle",
      password: "123456",
      firstName: "linh",
      lastName: "le",
    });

    user = userResponse.body;

    const loginResponse = await request.post("/login").send({
      username: "linhle",
      password: "123456",
    });
    token = loginResponse.body;
  });

  it("should create a new order", async () => {
    const newOrder = {
      user_id: user.id,
      status: "active",
    };
    const response = await request
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send(newOrder);

    expect(response.status).toBe(201);
  });

  it("should return all orders", async () => {
    const response = await request
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should return a single order by id", (done) => {
    const id = "12"; // Replace with an actual id or mock it
    request
      .get(`/orders/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response.status).toBe(200);
      });
    done();
  });
});
