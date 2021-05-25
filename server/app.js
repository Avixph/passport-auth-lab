const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));

app.use(passport.initialize());

app.use(passport.session());

require("./config/passport")(passport);

app.use("/api", routes);

module.exports = app;
