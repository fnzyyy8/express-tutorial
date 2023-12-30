import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  const name = req.cookies["name"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Read Cookie", async () => {
  const response = await request(app).get("/").set("cookie", "name=Farhan");

  expect(response.text).toBe("Hello Farhan");
});

test("Test Write Cookie", async () => {
  const response = await request(app).post("/login").send({ name: "Farhan" });
  expect(response.get("Set-Cookie").toString()).toContain("Farhan");
  expect(response.text).toBe("Hello Farhan");
});
