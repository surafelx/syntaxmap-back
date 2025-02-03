const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();

const app = express();

app.use(cors({ origin: true }));
app.options("*", cors(corsOptions)); // Handle preflight OPTIONS requests

app.use(bodyParser.json());
require("./config/passportConfig")(passport);
app.use(passport.initialize());

require("./index-v2.js")(app);

app.listen(process.env.PORT, () => {
  console.log("server started sur le port " + process.env.PORT);
});
