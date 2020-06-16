const uploadData = require("../seed_data/uploads");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("uploads")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("uploads").insert(uploadData);
    });
};
