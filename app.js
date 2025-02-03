const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const passport = require("passport");
//const colyseus = require("colyseus.js");
require("dotenv").config();

const corsOptions = {
  origin: '*', // Allow all origins, or you can restrict this to specific domains like: ['https://inquisitive-sunburst-5396b5.netlify.app']
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // if you need cookies or authentication
};

app.use(cors(corsOptions));

// Handling preflight requests (OPTIONS)
app.options('*', cors(corsOptions));

app.use(bodyParser.json());

require("./config/passportConfig")(passport);
app.use(passport.initialize());

require("./index-v2.js")(app);

/*const gameServer = new colyseus.Server({
  server: http.createServer(app)
});
gameServer.listen(process.env.PORT);
*/
app.listen(process.env.PORT, () => {
  console.log("server started sur le port " + process.env.PORT);
});
