require("dotenv").config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { startdB, stopDb, deleteAll } = require("./utils/inMemoryDb");

describe("/api/dashboards get tests", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    [server, connection] = await startdB();

    client = mockserver.agent(app);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  afterAll(async () => {
    await stopDb(server, connection);
  });

  test("returns an empty list for new users", async () => {
    // given
    const newUser = new User({
      username: "macska",
      googleId: "123456",
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    client.set("authorization", token);

    // when
    const response = await client.get("/api/dashboards");

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.user.dashboards).toStrictEqual([]);
  });

  test("deleted user receives nothing", async () => {
    // given

    const newUser = new User({
      username: "macska",
      googleId: 123456,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    client.set("authorization", token);
    await User.deleteMany();

    // when
    const response = await client.get("/api/dashboards");

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.user).toBeNull();
  });
});
