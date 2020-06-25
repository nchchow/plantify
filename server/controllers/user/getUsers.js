const User = require("../../models/user");

const getUsers = async (query) => {
  const { models } = await User.where(query).fetchAll({
    withRelated: ["uploads"],
  });
  // return new array from deserialized objects
  return models.map(({ attributes }) => {
    const { upload_ids, likes } = attributes;
    return {
      ...attributes,
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
  const { upload_ids, likes } = attributes;
  // return user data with deserialize arrays
  return {
    ...attributes,
    upload_ids: JSON.parse(upload_ids),
    likes: JSON.parse(likes),
  };
};

const getUserByEmail = async (email) => {
  const { attributes } = await User.where("email", email).fetch({
    withRelated: ["uploads"],
  });
  // convert query to destructured object
  const { upload_ids, likes } = attributes;
  // return user data with deserialize arrays
  return {
    ...attributes,
    upload_ids: JSON.parse(upload_ids),
    likes: JSON.parse(likes),
  };
};

module.exports = { getUsers, getUserById, getUserByEmail };
