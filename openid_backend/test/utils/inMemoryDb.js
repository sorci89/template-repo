const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const startdB = async () => {
  const server = await MongoMemoryServer.create();
  const uri = server.getUri();
  const connection = await mongoose.connect(uri);
  return [server, connection];
};

const stopDb = async (server, connection) => {
  await connection.disconnect();
  await server.stop();
};

const deleteAll = async (...collections) => {
  // for (const collection of collections) {
  //    await collection.deleteMany()
  // }
  const promises = collections.map((collection) => collection.deleteMany());
  await Promise.all(promises);
};

module.exports = { startdB, stopDb, deleteAll };
