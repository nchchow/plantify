const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");

const User = require("../models/user");

const { getUserById } = require("../controllers/user");

module.exports = (passport) => {
  // passport session setup
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    console.log("Deserializing ", id);
    getUserById(id)
      .then((user) => done(user))
      .catch((err) => done(err));
  });

  // LOCAL SIGNUP
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // asynchronous
        process.nextTick(() => {
          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.where("email", email)
            .fetch()
            .then(() => done(null, false))
            .catch(() => {
              // if there is no user with that email
              // create the user
              new User({
                name: req.body.name,
                email,
                password: bcrypt.hashSync(
                  password,
                  bcrypt.genSaltSync(8),
                  null
                ),
                upload_ids: "[]",
                likes: "[]",
              })
                .save()
                .then((newUser) => done(newUser));
            });
        });
      }
    )
  );
};
