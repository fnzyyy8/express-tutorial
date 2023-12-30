import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("RAHASIA"));
app.use(express.json());

app.get("/", (req, res) => {
  const name = req.signedCookies["name"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

test("Test Read Cookie", async () => {
  const response = await request(app)
    .get("/")
    .set(
      "cookie",
      "name=s%3AFarhan.60K%2F3ooY6FLx3d%2BnGc3ZjhAl7YTHXyvaqA2hKVoMRqg"
    );

  expect(response.text).toBe("Hello Farhan");
});

test("Test Write Cookie", async () => {
  const response = await request(app).post("/login").send({ name: "Farhan" });
  console.log(response.get("Set-Cookie").toString());
  expect(response.get("Set-Cookie").toString()).toContain("Farhan");
  expect(response.text).toBe("Hello Farhan");
});
