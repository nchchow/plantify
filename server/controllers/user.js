const User = require("../models/user");

const getUsers = async (query) => {
  const { models } = await User.where(query).fetchAll({
    withRelated: ["uploads"],
  });
  // return new array from deserialized objects
  return models.map(({ attributes }) => {
    const { user_id, name, upload_ids, likes } = attributes;
    return {
      user_id,
      name,
      upload_ids: JSON.parse(upload_ids),
      likes: JSON.parse(likes),
    };
  });
};

const getUserById = async (userId) => {
  const { attributes } = await User.where("user_id", userId).fetch({
    withRelated: ["uploads"],
  });
  // convert query to destructured object
  const { user_id, name, upload_ids, likes } = attributes;
  // return user data with deserialize arrays
  return {
    user_id,
    name,
    upload_ids: JSON.parse(upload_ids),
    likes: JSON.parse(likes),
  };
};

const updateUserById = async (userId, body) => {
  const queryResult = await User.where("user_id", userId).fetch();
  // convert query to destructured object
  const { name, upload_ids, likes } = queryResult.attributes;
  // deserialize arrays
  const uploadIdsParsed = JSON.parse(upload_ids);
  const likesParsed = JSON.parse(likes);
  // save
  const updatedUser = await queryResult.save({
    name: body.name ? body.name : name,
    upload_ids:
      body.uploadId && !uploadIdsParsed.includes(body.uploadId) // if updated and no dup
        ? JSON.stringify([...uploadIdsParsed, body.uploadId]) // push to array
        : upload_ids,
    likes:
      body.likedId && !likesParsed.includes(body.likedId) // if updated and no dup
        ? JSON.stringify([...likesParsed, body.likedId]) // push to array
        : likes,
  });
  return updatedUser;
};

module.exports = { getUsers, getUserById, updateUserById };
