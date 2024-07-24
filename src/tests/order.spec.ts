import supertest from "supertest";
import app from "../server"; // Adjust this import to the actual path of your Express app
import { User } from "../models/user";

const request = supertest(app);

describe("Order Routes", async () => {
  let token: string;
  let user: User;
  beforeAll(async () => {
    const userResponse = await request.post("/users").send({
      username: "linhle",
      password: "123456",
      firstname: "linh",
      lastname: "le",
    });

    user = userResponse.body;

    const loginResponse = await request.post("/login").send({
      username: "linhle",
      password: "123456",
    });
    token = loginResponse.body.token;
  });

  it("should create a new order", async (done) => {
    const newOrder = {
      /* order data structure */
    };
    request
      .post("/orders")
      .send(newOrder)
      .end((err, response) => {
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
          jasmine.objectContaining({ id: jasmine.any(String) })
        );
        done();
      });
  });

  it("should return all orders", async (done) => {
    request
      .get("/orders")
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        // Add more assertions as needed
        done();
      });
  });

  it("should return a single order by id", async (done) => {
    const id = "someOrderId"; // Replace with an actual id or mock it
    request.get(`/orders/${id}`).end((err, response) => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(jasmine.objectContaining({ id: id }));
      // Add more assertions as needed
      done();
    });
  });
});
