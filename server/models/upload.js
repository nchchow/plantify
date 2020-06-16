const bookshelf = require("../bookshelf");

const Upload = bookshelf.model("User", {
  tableName: "users",
  owner: function () {
    return this.belongsTo("User");
  },
});

module.exports = Upload;
