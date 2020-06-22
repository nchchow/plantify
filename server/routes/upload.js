const express = require("express");
const Upload = require("../models/upload");
const router = express.Router();

// controllers
const {
  getUploads,
  getUploadById,
  postUpload,
  updateUploadById,
  likeUpload,
} = require("../controllers/upload");

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

// create an upload
router.route("/").post((req, res) => {
  postUpload(req, res)
    .then((newUpload) => res.status(201).json(newUpload))
    .catch((err) => res.status(500).json({ error: "cannot create" }));
});

// like an upload
router.route("/:upload_id/like").put((req, res) => {
  likeUpload(req.params.upload_id, req.body.userId)
    .then((matchStatus) => res.status(200).json(matchStatus))
    .catch((err) => res.status(404).json({ error: "not found", err }));
});

// update an upload
router.route("/:upload_id").put((req, res) => {
  updateUploadById(req.params.upload_id, req.body.likedById)
    .then((updatedUpload) => res.status(200).json(updatedUpload))
    .catch((err) => res.status(500).json({ error: "cannot save" }));
});

// delete an upload
router.route("/:upload_id").delete((req, res) => {
  Upload.where("upload_id", req.params.upload_id)
    .destroy()
    .then((deletedUpload) => res.status(200).json({ deletedUpload }));
});

module.exports = router;
