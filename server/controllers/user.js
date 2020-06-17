const User = require("../models/user");

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

module.exports = getUserById;
