const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

// controllers
const { getUsers, getUserById } = require("../controllers/user/getUsers");

const { updateUserById } = require("../controllers/user/updateUser");

// get all users
router.route("/").get((req, res) => {
  getUsers(req.query)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(404).json({ error: "not found" }));
});

// get a user
router.route("/:user_id").get((req, res) => {
  getUserById(req.params.user_id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(404).json({ error: "not found" }));
});

// create new user
router.route("/signup").post(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await new User({
      name,
      email,
      upload_ids: "[]",
      likes: "[]",
      password: hashedPassword,
    }).save(null, { method: "insert" });
    res.status(200).json({ success: true });
  } catch {
    res.status(400).json({ err: "cannot create" });
  }
});

// login
router.route("/login").post(function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: "not found" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "success" });
    });
  })(req, res, next);
});

// update a user
router.route("/:user_id").put((req, res) => {
  updateUserById(req.params.user_id, req.body)
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((err) => res.status(500).json({ error: "cannot save" }));
});

// delete a user
router.route("/:user_id").delete((req, res) => {
  User.where("user_id", req.params.user_id)
    .destroy()
    .then((deletedUser) => res.status(200).json(deletedUser));
});

module.exports = router;
