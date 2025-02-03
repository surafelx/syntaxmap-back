const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const passport = require("passport");
//const colyseus = require("colyseus.js");
require("dotenv").config();

app.use(cors({ origin: "*" }));

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
