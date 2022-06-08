const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.get("/", auth({ block: true }), async (req, res) => {
  // send all dashboards of the user
  /*
need auth middleware with block
find user with userId from res.locals.userId 
return user / user dashboards
*/

  const user = await User.findById(res.locals.user.userId);

  res.json({ user });
});

router.get("/:id", async (req, res) => {
  // send only :id dashboard of the user
});

router.get("/:id/todos", async (req, res) => {
  // send all todos of :id dashboard of the user
});

router.get("/:id/todos/:todoId", async (req, res) => {
  // send :todoId of todos of :id dashboard of the user
});

router.post("/", async (req, res) => {
  // create dashboard for a user, send created :id
});

router.post("/:id/todos", async (req, res) => {
  // create todo of :id dashboard for a user, send created :todoId
});

router.patch("/:id", async (req, res) => {
  // update existing :id dashboard
});

router.patch("/:id/todos/:todoId", async (req, res) => {
  // update existing :todoId todo in :id dashboard of the user
});

router.delete("/:id", async (req, res) => {
  // delete :id dashboard
});

router.delete("/:id/todos/:todoId", async (req, res) => {
  // delete existing :todoId todo in :id dashboard of the user
});

module.exports = router;
