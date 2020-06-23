const Upload = require("../../models/upload");
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

module.exports = {
  getUploads,
  getUploadById,
};
