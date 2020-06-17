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

module.exports = { getUsers, getUserById };
