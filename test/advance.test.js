import express from "express";
import request from "supertest";

const app = express();

const middleware = (req, res, next) => {
  if (req.query.middleware === "Farhan") {
    next();
  } else {
    res.status(200);
    res.send("Kosong");
    res.end();
  }
};

app.use(middleware);
app.get("/", (req, res) => {
  res.send("Hello");
});

test("Test Advance Express", async () => {
  const response = await request(app).get("/").query({ middleware: "Anto" });
  expect(response.text).toBe("Hello");
});
