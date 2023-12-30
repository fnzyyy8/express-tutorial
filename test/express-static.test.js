import express from "express";
import request from "supertest";

const app = express();

app.use("/static", express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.send("Hello Response");
});

app.get("/contoh.txt", (req, res) => {
  res.send("Hello Response");
});

test("Test Static File", async () => {
  const response = await request(app).get("/");

  expect(response.text).toBe("Hello Response");
});

test("Test Static File Contoh.txt", async () => {
  const response = await request(app).get("/contoh.txt");

  expect(response.text).toBe("Hello Response");
});

test("Test Static File static/Contoh.txt", async () => {
  const response = await request(app).get("/static/contoh.txt");

  expect(response.text).toBe("ini sample data");
});
