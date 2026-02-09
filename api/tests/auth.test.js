const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../src/app");

test("auth login validation returns 400", async () => {
  const res = await request(app).post("/auth/login").send({});
  assert.strictEqual(res.status, 400);
});

test("auth register validation returns 400", async () => {
  const res = await request(app).post("/auth/register").send({});
  assert.strictEqual(res.status, 400);
});
