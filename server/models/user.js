const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  uploads: function () {
    return this.hasMany("Upload");
  },
});

module.exports = User;
