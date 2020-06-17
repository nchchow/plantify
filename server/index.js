const express = require("express");

const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");

const app = express();

require("dotenv").config();
const { PORT } = process.env;

app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoute);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
