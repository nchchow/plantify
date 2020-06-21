const multer = require("multer");
const path = require("path");
const Upload = require("../models/upload");
const User = require("../models/user");
const { getUserById, updateUserById } = require("./user");
const { URL, PORT } = process.env;

const getUploads = async (query) => {
  const { models } = await Upload.where(query).fetchAll({
    withRelated: ["user"],
  });
  // return new array from deserialized objects
  return models.map(({ attributes }) => {
    const { image_url, liked_by } = attributes;
    return {
      ...attributes,
      image_url: `http://${URL}${PORT}/api/images/${image_url}`,
      liked_by: JSON.parse(liked_by),
    };
  });
};

const getUploadById = async (uploadId) => {
  const { attributes } = await Upload.where("upload_id", uploadId).fetch({
    withRelated: "user",
  });
  // convert query to destructured object
  const { image_url, liked_by } = attributes;
  // send upload data with deserialize arrays
  return {
    ...attributes,
    image_url: `http://${URL}${PORT}/api/images/${image_url}`,
    liked_by: JSON.parse(liked_by),
  };
};

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
        upload_id: "13", // TODO: use random id
        liked_by: "[]", // JSON.stringify([])
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

const updateUploadById = async (uploadId, likedById) => {
  const queryResult = await Upload.where("upload_id", uploadId).fetch();
  // deserialize array
  const likedByParsed = JSON.parse(queryResult.attributes.liked_by);
  const likedBy = likedByParsed.includes(likedById)
    ? likedByParsed
    : [...likedByParsed, likedById];
  return queryResult.save({
    ...queryResult.attributes,
    liked_by: JSON.stringify(likedBy),
  });
};

const likeUpload = async (likedId, likedById) => {
  // get user that liked
  const likedUser = await getUserById(likedById);
  // get upload from upload id
  const upload = await getUploadById(likedId);
  // get its owner
  const owner = await getUserById(upload.owner_id);
  // compare owner likes with liked user uploads
  const isMatch = owner.likes.some((id) => likedUser.upload_ids.includes(id));
  if (isMatch) {
    // if there's a match, send notification
    // TODO: send notification
    console.log("Matched!");
  } else {
    // else exchange ids
    await updateUploadById(likedId, likedById);
    await updateUserById(likedById, { likedId });
  }
};

module.exports = {
  getUploads,
  getUploadById,
  postUpload,
  updateUploadById,
  likeUpload,
};
