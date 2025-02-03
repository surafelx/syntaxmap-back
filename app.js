const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const passport = require("passport");
//const colyseus = require("colyseus.js");
require("dotenv").config();


const corsOptions = {
  origin: 'https://syntaxmap-front-2z2b.onrender.com',  // Frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies and credentials
};

app.use(cors(corsOptions));  // Apply CORS middleware
app.options('*', cors(corsOptions));  // Handle preflight OPTIONS requests


// Handling preflight requests (OPTIONS)

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


