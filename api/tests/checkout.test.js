const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../src/app");

test("checkout without auth returns 401", async () => {
  const res = await request(app).post("/checkout").send({});
  assert.strictEqual(res.status, 401);
});
