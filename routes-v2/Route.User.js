// import user ressources
const User = require("../modules/Ressources.User/User.js");
const UserService = require("../modules/Ressources.User/UserService.js");

// import jwt
const issueJWTLogin = require("../modules/Token/jwtLogin");
const issueJWTVerification = require("../modules/Token/jwtConfirmation");

// import decoder jwt
const jwtDecode = require("jwt-decode");

// import bcrypt
const bcrypt = require("bcrypt");

// import passport
var passport = require("passport");

// import client mail sendgrid
const sendgridMailer = require("@sendgrid/mail");
sendgridMailer.setApiKey(process.env.API_KEY_SENDGRID);

//import ErrorObject
const ErrorObject = require("../modules/error/ErrorObject.js");

module.exports = (app) => {
  var userService = new UserService();

  //Get all user
  app.get("/user", (req, res) => {
    console.log("Got here");
    userService.SELECT({}, (users) => {
      if (!users) {
        res.status(406).end();
        return;
      } else {
        let results = [];
        if (req?.user?.authorization === "admin")
          users.forEach((item) => {
            delete item.user_password;
            results.push(item.toObject(true, true, true));
          });
        else
          users.forEach((item) => {
            delete item.user_password;
            if (item.authorization !== "admin")
              results.push(item.toObject(false, true, true));
          });
        res.status(200).json({ users: results });
      }
    });
  });

  //User Register
  app.post("/user/register", (req, res) => {
    bcrypt.hash(req.body.user_password, 10, function (err, hash) {
      let user = {
        user_email_address: req.body.user_email_address,
        user_password: hash,
      };
      let bodyNewUser = new User(null, null, user);
      userService.INSERT(bodyNewUser, (newUser) => {
        console.log(newUser);
        res.status(200).json({ msg: "User succesfully registerd" });
      });
    });
  });

  app.post("/user/password", (req, res) => {
    bcrypt.hash(req.body.user_password, 10, function (err, hash) {
      let user = {
        user_password: hash,
        user_email_address: jwtDecode(req.get("Authorization").split(" ")[1])
          .sub,
      };
      userService.UPDATE_password(user, (newUser) => {
        console.log(newUser);
        if (newUser.code) {
          res.statusMessage = newUser.errorMessage;
          res.status(newUser.code).end();
          return;
        } else {
          res.status(200).json({ msg: "you can log in" });
        }
      });
    });
  });

  //User connection
  app.post("/user/login", (req, res) => {
    //console.log(req);
    let criteria = {
      user_email_address: req.body.user_email_address,
    };
    userService.SELECT(criteria, (users) => {
      console.log(users, req.body);
      if (users.code) {
        res.status(406).json({ err: "Email or password wrong" });
        return;
      } else {
        const hash = users[0].user_password;
        // bcrypt.compare(req.body.user_password, hash).then(function(result) {
        // 	if (result){
        console.log(users[0]);
        var jstoken = issueJWTLogin(users[0]);
        res
          .status(200)
          .json({ jwt: jstoken, last_session: users[0].last_session });
        // }
        // 	else {
        // 		res.status(406).json({"err":"Email or password wrong"});
        // 	}
        // }).catch((err) => { console.log(err) });
      }
    });
  });

  //Update last session
  app.post("/user/last_session", (req, res) => {
    let user = {
      last_session: req.body.session,
      user_id: jwtDecode(req.get("Authorization").split(" ")[1]).sub,
    };
    userService.UPDATE_last_session(user, (newUser) => {
      console.log(newUser);
      if (newUser.code) {
        res.statusMessage = newUser.errorMessage;
        res.status(newUser.code).end();
        return;
      } else {
        res.status(200).json({ msg: "you can log in" });
      }
    });
  });
};
