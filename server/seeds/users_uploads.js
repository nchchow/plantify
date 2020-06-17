const userData = require("../seed_data/users");
const uploadData = require("../seed_data/uploads");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert(userData);
    })
    .then(() => knex("uploads").del())
    .then(() => knex("uploads").insert(uploadData));
};
