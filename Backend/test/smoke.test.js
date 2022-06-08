const app = require("../app");
const mockserver = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  // given - many lines - adott egy helyzet kóddal leirva
  // no setup required
  // when - always one action /line - megtörténik az action
  const result = sum(1, 2);

  // then - 2-3 expect lines - kimenetel
  expect(result).toBe(3);
});

test("/random endpoint gives back status 404", async () => {
  // given
  const server = mockserver(app);

  // when
  const response = await server.get("/random");

  // then
  expect(response.status).toBe(404);
});

test("mongo inmemory server is working", async () => {
  // given
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const connection = await mongoose.connect(uri);

  const Cat = mongoose.model("Cat", { name: String });
  const kitty = new Cat({ name: "Bijou" });

  // when
  await kitty.save();

  // then
  const catInDb = await Cat.findOne();
  expect(catInDb.name).toBe("Bijou");
  await connection.disconnect();
  await mongod.stop();
});
