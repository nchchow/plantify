const express = require("express");
const User = require("../models/user");
const Upload = require("../models/upload");
const router = express.Router();

// controllers
const {
  getUploads,
  getUploadById,
  likeUpload,
} = require("../controllers/upload");
const { getUserById } = require("../controllers/user");

// get all uploads
router.route("/").get((req, res) => {
  getUploads(req.query)
    .then((uploads) => res.status(200).json(uploads))
    .catch((err) => res.status(404).json({ error: "not found" }));
});

// get an upload
router.route("/:upload_id").get((req, res) => {
  getUploadById(req.params.upload_id)
    .then((upload) => res.status(200).json(upload))
    .catch((err) => res.status(404).json({ error: "not found" }));
});

// like an upload
router.route("/:upload_id/like").put((req, res) => {
  likeUpload(req.params.upload_id, "1")
    .then(() => res.status(200))
    .catch((err) => res.status(404).json({ error: "not found" }));
});

// // update an upload
// router.route("/:upload_id").put((req, res) => {
//   if (req.body.userId) {
//     User.where("user_id", req.body.userId)
//       .fetch()
//       .then()
//       .catch((user) =>
//         res.status(404).json({ error: "Please provide valid user id" })
//       );
//   }
//   Upload.where("upload_id", req.params)
//     .fetch()
//     .then((upload) =>
//       upload
//         .save({
//           upload_id: upload.upload_id,
//           liked_by: JSON.stringify(req.body.likedById) // if updated
//             ? JSON.stringify(upload.liked_by.push(req.body.likedById)) // push to array
//             : upload.liked_by,
//           owner_id: upload.owner_id,
//         })
//         .then((updatedUpload) => res.status(200).json({ updatedUpload }))
//     );
// });

// // create an upload
// router.route("/").post((req, res) => {
//   User.where("user_id", req.body.userId)
//     .fetch()
//     .then()
//     .catch((user) =>
//       res.status(400).json({ error: "Please provide valid user id" })
//     );
//   new Upload({
//     upload_id: Date.now(), // TODO: uuid()
//     liked_by: JSON.stringify([""]),
//     owner_id: req.body.ownerId,
//   })
//     .save()
//     .then((newUpload) => res.statuus(201).json({ newUpload }));
// });

// // delete an upload
// router.router("/:id").delete((req, res) => {
//   Upload.where("upload_id", req.params)
//     .destroy()
//     .then((deletedUpload) => res.status(200).json({ deletedUpload }));
// });

module.exports = router;
