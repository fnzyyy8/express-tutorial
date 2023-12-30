import express from "express";
import request from "supertest";

const app = express();

app.get("/products/*.json", (req, res) => {
  res.send(req.originalUrl);
});

app.get("/categories/*(\\d+).json", (req, res) => {
  res.send(req.originalUrl);
});

test("Test RoutePath", async () => {
  let response = await request(app).get("/products/anto.json");
  expect(response.text).toBe("/products/anto.json");

  response = await request(app).get("/categories/2725.json");
  expect(response.text).toBe("/categories/2725.json");

  response = await request(app).get("/categories/anto.json");
  expect(response.status).toBe(404);
});
