const bookshelf = require("../bookshelf");

const Upload = bookshelf.model("Upload", {
  tableName: "uploads",
  user: function () {
    return this.belongsTo("User");
  },
});

module.exports = Upload;
