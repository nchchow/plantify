const express = require("express");

const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");

const app = express();

app.use(express.json());

require("dotenv").config();
const { PORT } = process.env;

app.use("/api/users", userRoute);
app.use("/api/uploads", uploadRoute);
app.use("/api/images", express.static(__dirname + "/uploaded_photos"));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
