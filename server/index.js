const express = require("express");
const app = express();
const passport = require("passport");

const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");

const initPassport = require("./config/passport");
initPassport(passport);

// middleware
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(passport.initialize());
app.use(passport.session());

require("dotenv").config();
const { PORT } = process.env;

app.use("/api/users", userRoute);
app.use("/api/uploads", uploadRoute);
app.use("/api/images", express.static(__dirname + "/uploaded_photos"));
app.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
