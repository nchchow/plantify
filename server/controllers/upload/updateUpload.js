const nodemailer = require("nodemailer");
const Upload = require("../../models/upload");
const { getUploadById } = require("./getUploads");
const { getUserById } = require("../user/getUsers");
const { updateUserById } = require("../user/updateUser");
const { EMAIL_USER, EMAIL_PASS } = process.env;

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
  await exchangeIds(likedUploadId, likedUserId);
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
    sendEmail(likedUser, upload, owner, matchedUpload);
    return { matched: true };
  } else {
    return { matched: false };
  }
};

const exchangeIds = async (likedUploadId, likedUserId) => {
  await updateUploadById(likedUploadId, likedUserId);
  await updateUserById(likedUserId, { likedId: likedUploadId });
};

const sendEmail = (likedUser, upload, owner, matchedUpload) => {
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
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
};

module.exports = {
  updateUploadById,
  likeUpload,
};
