const Upload = require("../models/upload");

const getUploadById = async (uploadId) => {
  const upload = await Upload.where("upload_id", uploadId).fetch({
    withRelated: "user",
  });
  // convert query to destructured object
  const { upload_id, owner_id, liked_by } = JSON.parse(JSON.stringify(upload));
  // send upload data with deserialize arrays
  return {
    upload_id,
    owner_id,
    liked_by: JSON.parse(liked_by),
  };
};

module.exports = getUploadById;
