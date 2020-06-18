const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  idAttribute: "user_id",
  uploads: function () {
    return this.hasMany("Upload");
  },
});

module.exports = User;
