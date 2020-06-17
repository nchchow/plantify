const Upload = require("../models/upload");

const getUploads = async (query) => {
  const queryResults = await Upload.where(query).fetchAll({
    withRelated: ["user"],
  });
  // convert query to serialized array
  const serialized = JSON.parse(JSON.stringify(queryResults));
  // create new array from deserialized objects
  return serialized.map((upload) => {
    const { upload_id, owner_id, liked_by } = upload;
    return {
      upload_id,
      owner_id,
      liked_by: JSON.parse(liked_by),
    };
  });
};

const getUploadById = async (uploadId) => {
  const queryResult = await Upload.where("upload_id", uploadId).fetch({
    withRelated: "user",
  });
  // convert query to destructured object
  const { upload_id, owner_id, liked_by } = JSON.parse(
    JSON.stringify(queryResult)
  );
  // send upload data with deserialize arrays
  return {
    upload_id,
    owner_id,
    liked_by: JSON.parse(liked_by),
  };
};

module.exports = { getUploads, getUploadById };
