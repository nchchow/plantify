const bookshelf = require("../bookshelf");

const Upload = bookshelf.model("Upload", {
  tableName: "uploads",
  idAttribute: "upload_id",
  user: function () {
    return this.belongsTo("User");
  },
});

module.exports = Upload;
