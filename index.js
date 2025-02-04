const express = require("express");
const app = express();
const port = 8080;
const courseRoutes = require('./routes/Course');
const userRoutes = require('./routes/User');
const userUploadRoutes = require('./routes/UserUpload');
const questionRoutes = require('./routes/Question');
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use('/', courseRoutes);
app.use('/', userRoutes);
app.use('/', userUploadRoutes);
app.use('/', questionRoutes);
app.listen(process.env.PORT || port, () => {console.log("server started sur le port " + port)});