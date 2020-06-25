const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { getUserById, getUserByEmail } = require("../controllers/user/getUsers");

const authenticateUser = async (email, password, done) => {
  try {
    const user = await getUserByEmail(email);
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      console.log("wrong pass");
      return done(null, false, { message: "password incorrect" });
    }
  } catch (err) {
    return done(null, false, { message: "no user with that email" });
  }
};

module.exports = (passport) => {
  // passport session setup
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    getUserById(id)
      .then((user) => {
        done(user);
      })
      .catch((err) => {
        done(err);
      });
  });

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
};
