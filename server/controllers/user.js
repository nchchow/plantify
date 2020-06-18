const User = require("../models/user");

const getUsers = async (query) => {
  const queryResults = await User.where(query).fetchAll({
    withRelated: ["uploads"],
  });
  // convert query to serialized array
  const serialized = JSON.parse(JSON.stringify(queryResults));
  // create new array from deserialized objects
  return serialized.map((user) => {
    const { user_id, name, upload_ids, likes } = user;
    return {
      user_id,
      name,
      upload_ids: JSON.parse(upload_ids),
      likes: JSON.parse(likes),
    };
  });
};

const getUserById = async (userId) => {
  const queryResult = await User.where("user_id", userId).fetch({
    withRelated: ["uploads"],
  });
  // convert query to destructured object
  const { user_id, name, upload_ids, likes } = JSON.parse(
    JSON.stringify(queryResult)
  );
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
  const { name, upload_ids, likes } = queryResult.attributes;
  const uploadIdsParsed = JSON.parse(upload_ids);
  const likesParsed = JSON.parse(likes);
  const updatedUser = await queryResult.save({
    name: body.name ? body.name : name,
    upload_ids:
      body.uploadId && !uploadIdsParsed.includes(body.uploadId) // if updated
        ? JSON.stringify([...uploadIdsParsed, body.uploadId]) // push to array
        : upload_ids,
    likes:
      body.likedId && !likesParsed.includes(body.likedId) // if updated
        ? JSON.stringify([...likesParsed, body.likedId]) // push to array
        : likes,
  });
  return updatedUser;
};

module.exports = { getUsers, getUserById, updateUserById };
