const User = require("../../models/user");

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

module.exports = { updateUserById };
