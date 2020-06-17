const express = require("express");
const User = require("../models/user");
const Upload = require("../models/upload");
const router = express.Router();

// controllers
const getUploadById = require("../controllers/upload");

// get all uploads
router.route("/").get((req, res) => {
  Upload.where(req.query)
    .fetchAll({ withRelated: ["user"] })
    .then((uploads) => {
      // convert query to serialized array
      const serialized = JSON.parse(JSON.stringify(uploads));
      // create new array from deserialized objects
      const deserialized = serialized.map((upload) => {
        const { upload_id, owner_id, liked_by } = upload;
        return {
          upload_id,
          owner_id,
          liked_by: JSON.parse(liked_by),
        };
      });
      res.status(200).json(deserialized);
    });
});

// get an upload
router.route("/:upload_id").get((req, res) => {
  getUploadById(req.params).then((upload) => res.status(200).json(upload));
});

// like an upload
router.route("/:upload_id").put((req, res) => {
  // body has user id
  // get upload from upload id
  // find its owner
  // compare owner likes with user uploads
  // if there's a match, send notification
  // else exchange ids
});

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

// // update an upload
// router.route("/:id").put((req, res) => {
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

// // delete an upload
// router.router("/:id").delete((req, res) => {
//   Upload.where("upload_id", req.params)
//     .destroy()
//     .then((deletedUpload) => res.status(200).json({ deletedUpload }));
// });

module.exports = router;
