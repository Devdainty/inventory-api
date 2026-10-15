const request = require("supertest");
const app = require("../app");
const Product = require("../models/productModel");

// Mock Mongoose so it doesn't actually need a real database running during tests
jest.mock("../models/productModel");

describe("Product API Tests", () => {
  it("Should get all products publicly without a token", async () => {
    // Fake the database response
    Product.find.mockResolvedValueOnce([
      { name: "Laptop", price: 1200, category: "Electronics", quantity: 5 },
    ]);

    const res = await request(app).get("/api/v1/products");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toEqual(1);
  });

  it("Should fail to create a product without a token (401)", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send({ name: "Test Item", price: 10, category: "Test", quantity: 5 });

    expect(res.statusCode).toEqual(401);
  });
});
