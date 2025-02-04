const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();

const app = express();

// Allow the specific frontend origin
const corsOptions = {
  origin: 'https://syntaxmap-front-2z2b.onrender.com', // The frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies or credentials (for JWT headers)
};

// Use CORS middleware with the custom options
app.use(cors(corsOptions));

// Optionally, handle pre-flight requests (OPTIONS)
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
require("./config/passportConfig")(passport);
app.use(passport.initialize());

require("./index-v2.js")(app);

app.listen(process.env.PORT, () => {
  console.log("server started sur le port " + process.env.PORT);
});
