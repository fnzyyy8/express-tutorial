import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
  res.send(`Product ${req.params.id}`);
});

app.get("/categories/:id(\\d+)", (req, res) => {
  res.send(`Category ${req.params.id}`);
});

test("Route Params", async () => {
  let response = await request(app).get("/products/ikan");
  expect(response.text).toBe("Product ikan");

  response = await request(app).get("/categories/1");
  expect(response.text).toBe("Category 1");

  response = await request(app).get("/categories/ayam");
  expect(response.status).toBe(404);
});
