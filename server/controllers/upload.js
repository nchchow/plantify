const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
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

const likeUpload = async (likedUploadId, likedUserId) => {
  // get user that liked
  const likedUser = await getUserById(likedUserId);
  // get upload from upload id
  const upload = await getUploadById(likedUploadId);
  // get its owner
  const owner = await getUserById(upload.owner_id);
  // compare owner likes with liked user uploads
  const matchedIds = owner.likes.filter(
    (id) => likedUser.upload_ids.indexOf(id) !== -1
  );
  if (matchedIds.length > 0) {
    const matchedUpload = await getUploadById(matchedIds[0]);
    // if there's a match, send notification
    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "785120690e3544",
        pass: "189b27254f7406",
      },
    });

    const message = {
      from: "noreply@plantify.com", // Sender address
      to: `${likedUser.email}, ${owner.email}`, // List of recipients
      subject: "Match from Plantify!", // Subject line
      text: `${likedUser.name} liked ${owner.name}'s ${upload.title} & ${owner.name} liked ${likedUser.name}'s ${matchedUpload.title}`, // Plain text body
    };

    transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  } else {
    // else exchange ids
    await updateUploadById(likedUploadId, likedUserId);
    await updateUserById(likedUserId, { likedId: likedUploadId });
  }
};

module.exports = {
  getUploads,
  getUploadById,
  postUpload,
  updateUploadById,
  likeUpload,
};
