const bookshelf = require("../bookshelf");
const Upload = require("./upload");

const User = bookshelf.model("User", {
  tableName: "users",
  idAttribute: "user_id",
  uploads: function () {
    return this.hasMany(Upload, "upload_id");
  },
});

module.exports = User;
