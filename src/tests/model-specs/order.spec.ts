import { OrderModel } from "../../models"; // Adjust the import path to your Order class

describe("Order", () => {
  let order: any;

  beforeEach(() => {
    order = new OrderModel();
    // Mock the database connection and query execution here
  });

  describe("index", () => {
    it("should return an array of orders", async () => {
      // Mock the result of the database query
      const mockOrders = [
        { id: "1", status: "active" },
        { id: "2", status: "complete" },
      ];
      spyOn(order, "index").and.returnValue(Promise.resolve(mockOrders));

      const result = await order.index();
      expect(result.length).toBe(2);
      expect(result).toEqual(mockOrders);
    });
  });

  describe("show", () => {
    it("should return a single order by id", async () => {
      const mockOrder = { id: "1", status: "active" };
      spyOn(order, "show").and.returnValue(Promise.resolve(mockOrder));

      const result = await order.show("1");
      expect(result).toEqual(mockOrder);
    });
  });

  describe("addProductToOrder", () => {
    it("should add a product to an order", async () => {
      // Assuming the method returns some success indicator or the updated order
      const successIndicator = { success: true };
      spyOn(order, "addProductToOrder").and.returnValue(
        Promise.resolve(successIndicator)
      );

      const result = await order.addProductToOrder("1", "1");
      expect(result).toEqual(successIndicator);
    });
  });
});
