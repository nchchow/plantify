const Upload = require("../models/upload");
const { getUserById, updateUserById } = require("./user");

const getUploads = async (query) => {
  const { models } = await Upload.where(query).fetchAll({
    withRelated: ["user"],
  });
  // return new array from deserialized objects
  return models.map(({ attributes }) => {
    const { upload_id, owner_id, liked_by } = attributes;
    return {
      upload_id,
      owner_id,
      liked_by: JSON.parse(liked_by),
    };
  });
};

const getUploadById = async (uploadId) => {
  const { attributes } = await Upload.where("upload_id", uploadId).fetch({
    withRelated: "user",
  });
  // convert query to destructured object
  const { upload_id, owner_id, liked_by } = attributes;
  // send upload data with deserialize arrays
  return {
    upload_id,
    owner_id,
    liked_by: JSON.parse(liked_by),
  };
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

module.exports = { getUploads, getUploadById, updateUploadById, likeUpload };
