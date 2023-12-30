import express from "express";
import request from "supertest";

const app = express();

const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`Error : ${err.message}`);
};

app.get("/", (req, res) => {
  throw new Error("Ups");
});

app.use(errorMiddleware);

test("Test Send File", async () => {
  const response = await request(app).get("/");

  expect(response.text).toBe("Error : Ups");
  expect(response.statusCode).toBe(500);
});
