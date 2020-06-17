const express = require("express");
const User = require("../models/user");
const router = express.Router();

// controllers
const { getUsers, getUserById } = require("../controllers/user");

// get all users
router.route("/").get((req, res) => {
  getUsers(req.query).then((users) => res.status(200).json(users));
});

// get a user
router.route("/:user_id").get((req, res) => {
  getUserById(req.params.user_id).then((user) => res.status(200).json(user));
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

// // update a user
// router.route("/:id").put((req, res) => {
//   User.where("user_id", req.params)
//     .fetch()
//     .then((user) =>
//       user
//         .save({
//           user_id: Date.now(), // TODO: change to uuid
//           name: req.body.name ? req.body.name : user.name,
//           upload_ids: JSON.stringify(req.body.uploadId) // if updated
//             ? JSON.stringify(user.upload_ids.push(req.body.uploadId)) // push to array
//             : user.upload_ids,
//           likes: JSON.stringify(req.body.likedId) // if updated
//             ? JSON.stringify(user.likes.push(req.body.likedId)) // push to array
//             : user.likes,
//         })
//         .then((updatedUser) => res.status(200).json(updatedUser))
//     );
// });

// // delete a user
// router.route("/:id").delete((req, res) => {
//   User.where("user_id", req.params)
//     .destroy()
//     .then((deletedUser) => res.status(200).json(deletedUser));
// });

module.exports = router;
