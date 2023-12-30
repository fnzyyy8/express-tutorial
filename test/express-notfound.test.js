import express, { Router } from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Response");
});

app.use((req, res, next) => {
  res.status(404).send("Not Found 404 middleware");
});

test("Test Found", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
});

test("Test Not-Found", async () => {
  const response = await request(app).get("/tidak-ada");
  expect(response.text).toBe("Not Found 404 middleware");
});
