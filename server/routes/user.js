const express = require("express");
const User = require("../models/user");
const router = express.Router();

// controllers
const { getUsers, getUserById } = require("../controllers/user");

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

// // create new user
// router.route("/").post((req, res) => {
//   new User({
//     user_id: Date.now(), // TODO: change to uuid()
//     name: req.body.name,
//     upload_ids: JSON.stringify([""]),
//     likes: JSON.stringify([""]),
//   })
//     .save()
//     .then((newUser) => res.status(200).json(newUser));
// });

// update a user
router.route("/:user_id").put((req, res) => {
  User.where("user_id", req.params.user_id)
    .fetch()
    .then((queryResult) => {
      const { name, upload_ids, likes } = queryResult.attributes;
      const uploadIdsParsed = JSON.parse(upload_ids);
      const likesParsed = JSON.parse(likes);
      queryResult
        .save({
          name: req.body.name ? req.body.name : name,
          upload_ids:
            req.body.uploadId && !uploadIdsParsed.includes(req.body.uploadId) // if updated
              ? JSON.stringify([...uploadIdsParsed, req.body.uploadId]) // push to array
              : upload_ids,
          likes:
            req.body.likedId && !likesParsed.includes(req.body.likedId) // if updated
              ? JSON.stringify([...likesParsed, req.body.likedId]) // push to array
              : likes,
        })
        .then((updatedUser) => res.status(200).json(updatedUser))
        .catch((err) => res.status(500).json({ error: "cannot save" }));
    });
});

// // delete a user
// router.route("/:id").delete((req, res) => {
//   User.where("user_id", req.params)
//     .destroy()
//     .then((deletedUser) => res.status(200).json(deletedUser));
// });

module.exports = router;
