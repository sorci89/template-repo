require("dotenv").config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { startdB, stopDb, deleteAll } = require("./utils/inMemoryDb");
const {
  setupGoogleSuccessResponse,
  setupGoogleErrorResponse,
} = require("./utils/httpMockApi");

describe("/api/user/login get tests", () => {
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

  test("should return 400 without body (user not created in database)", async () => {
    //given

    //when

    const response = await client.post("/api/user/login");
    //then
    expect(response.status).toBe(400);
  });

  test("should return 400 without provider data (user not created in database)", async () => {
    //given
    const code = "random";

    //when

    const response = await client.post("/api/user/login").send({
      code,
    });

    //then
    expect(response.status).toBe(400);
  });

  test("should return 400 without code data (user not created in database)", async () => {
    //given
    const provider = "github";
    //when

    const response = await client.post("/api/user/login").send({
      provider,
    });

    //then
    expect(response.status).toBe(400);
  });

  test("should return 400 with invalid provider data(user not created in database)", async () => {
    //given
    const code = "random";
    const provider = "invalid";

    //when

    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    //then
    expect(response.status).toBe(400);
  });

  test("should return 200 & JWT token with valid provider data(user not created in database)", async () => {
    //given
    const code = "random";
    const provider = "google";
    const googleUserId = "123456789";
    setupGoogleSuccessResponse(googleUserId);

    //when

    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    //then
    expect(response.status).toBe(200);
    const responseToken = jwt.decode(response.body);
    expect(responseToken.providers.google).toBe(googleUserId);
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });

  test("should return 401 with invalid code(user not created in database)", async () => {
    //given
    const code = "random";
    const provider = "google";
    setupGoogleErrorResponse();

    //when

    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    //then
    expect(response.status).toBe(401);
    const responseToken = jwt.decode(response.body);
    expect(responseToken.providers.google).toBe(googleUserId);
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });
});
