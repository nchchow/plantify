const express = require("express");
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
router.route("/").post((req, res) => {
  new User({
    name: req.body.name,
    upload_ids: "[]",
    likes: "[]",
  })
    .save()
    .then((newUser) => res.status(200).json(newUser));
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
