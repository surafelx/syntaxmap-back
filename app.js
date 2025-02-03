const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();

const app = express();

// Apply CORS middleware first
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies and credentials
};

app.use(cors(corsOptions));  // CORS middleware must be at the top
app.options('*', cors(corsOptions));  // Handle preflight OPTIONS requests

app.use(bodyParser.json());
require("./config/passportConfig")(passport);
app.use(passport.initialize());

require("./index-v2.js")(app);

app.listen(process.env.PORT, () => {
  console.log("server started sur le port " + process.env.PORT);
});
