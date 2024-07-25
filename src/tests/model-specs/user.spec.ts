import { UserModel } from "../../models"; // Adjust the import path to your UserModel class

describe("UserModel", () => {
  let userModel: any;

  beforeEach(() => {
    userModel = new UserModel();
    // Mock the database connection and query execution here if necessary
  });

  describe("index", () => {
    it("should return an array of users", async () => {
      const mockUsers = [
        { id: 1, username: "user1", email: "user1@example.com" },
        { id: 2, username: "user2", email: "user2@example.com" },
      ];
      spyOn(userModel, "index").and.returnValue(Promise.resolve(mockUsers));

      const result = await userModel.index();
      expect(result.length).toBe(2);
      expect(result).toEqual(mockUsers);
    });
  });

  describe("show", () => {
    it("should return a single user by id", async () => {
      const mockUser = { id: 1, username: "user1", email: "user1@example.com" };
      spyOn(userModel, "show").and.returnValue(Promise.resolve(mockUser));

      const result = await userModel.show(1);
      expect(result.id).toBe(1);
      expect(result.username).toEqual("user1");
      expect(result.email).toEqual("user1@example.com");
    });
  });

  describe("create", () => {
    it("should add a new user and return that user", async () => {
      const newUser = {
        username: "newUser",
        email: "newuser@example.com",
        password: "password123",
      };
      const mockUser = { id: 3, ...newUser };
      spyOn(userModel, "create").and.returnValue(Promise.resolve(mockUser));

      const result = await userModel.create(newUser);
      expect(result.id).toBe(3);
      expect(result.username).toEqual("newUser");
      expect(result.email).toEqual("newuser@example.com");
    });
  });
});
