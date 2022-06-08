const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // empty string is enough
  isDone: { type: Boolean, default: false },
});

const dashboardSchema = new mongoose.Schema({
  title: String,
  todos: [todoSchema], // the default is empty list?
});

const userSchema = new mongoose.Schema({
  username: { type: String }, //empty string NO!
  //email: { type: String, unique: true, required: true },
  //password: { type: String, required: true },
  providers: {
    google: { type: String },
    github: { type: String },
  },
  dashboards: [dashboardSchema], //the default is empty list?
});

const User = mongoose.model("user", userSchema);
module.exports = User;
