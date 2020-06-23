const multer = require("multer");
const path = require("path");
const Upload = require("../../models/upload");
const User = require("../../models/user");

const postUpload = async (req, res) => {
  // storage engine
  const storage = multer.diskStorage({
    destination: "./uploaded_photos/",
    filename: (req, file, cb) => {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  // init multer
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single("image");

  // upload
  upload(req, res, async (err) => {
    if (err) {
      return { error: err };
    } else if (!req.file) {
      return { error: "Please provide valid image file" };
    } else {
      const { userId, title, description } = req.body;
      // catch invalid user ids
      User.where("user_id", userId)
        .fetch()
        .then()
        .catch(() => {
          error: "Please provide valid user id";
        });
      // save new upload in db
      return await new Upload({
        liked_by: "[]",
        owner_id: userId,
        title,
        description,
        image_url: req.file.filename,
      })
        .save(null, { method: "insert" })
        .catch((err) => err);
    }
  });
};

module.exports = {
  postUpload,
};
