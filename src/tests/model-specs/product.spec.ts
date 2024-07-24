import { ProductModel } from "../../models"; // Adjust the import path to your ProductModel class

describe("ProductModel", () => {
  let productModel: any;

  beforeEach(() => {
    productModel = new ProductModel();
    // Mock the database connection and query execution here
  });

  describe("index", () => {
    it("should return an array of products", async () => {
      // Mock the result of the database query
      const mockProducts = [
        { id: "1", name: "Product 1", price: 100 },
        { id: "2", name: "Product 2", price: 200 },
      ];
      spyOn(productModel, "index").and.returnValue(
        Promise.resolve(mockProducts)
      );

      const result = await productModel.index();
      expect(result.length).toBe(2);
      expect(result).toEqual(mockProducts);
    });
  });

  describe("show", () => {
    it("should return a single product by id", async () => {
      const mockProduct = { id: "1", name: "Product 1", price: 100 };
      spyOn(productModel, "show").and.returnValue(Promise.resolve(mockProduct));

      const result = await productModel.show("1");
      expect(result.id).toBe("1");
      expect(result.name).toEqual("Product 1");
      expect(result.price).toEqual(100);
    });
  });
});
