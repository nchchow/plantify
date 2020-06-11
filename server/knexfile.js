require("dotenv").config();
const { HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

module.exports = {
  client: "mysql",
  connect: {
    host: HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    charset: "utf8",
  },
};
