import express, { Router } from "express";
import request from "supertest";

const app = express();
const router = express.Router();

router.use((req, res, next) => {
  console.log("Middleware");
  next();
});

router.get("/feature/a", (req, res, next) => {
  res.send("Feature a");
});

test("Router Disabled", async () => {
  let response = await request(app).get("/feature/a");
  expect(response.status).toBe(404);
});

test("Router Enabled", async () => {
  app.use(router);

  let response = await request(app).get("/feature/a");
  expect(response.text).toBe("Feature a");
});
