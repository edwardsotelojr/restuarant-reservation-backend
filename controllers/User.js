const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createJWT } = require("../utils/auth");
// test http post request with Postman

exports.signup = async (req, res) => {
  const {
    email,
    name,
    password,
    phone,
    mailingAddress,
    billingAddress,
    preferredAmountOfDiners,
  } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ error: "email already exists" });
    }
    const newUser = new User({
      email: email,
      name: name,
      password: password,
      phone: phone,
      mailingAddress: mailingAddress,
      billingAddress: billingAddress,
      preferredAmountOfDiners: preferredAmountOfDiners,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            res.json(user);
            console.log("user saved.");
          })
          .catch((err) => console.log(err));
      });
    });
  });
};

exports.getUser = (req, res) => {
  let { email } = req.query;
  User.findOne({ email: email })
    .then((user) => {
      if (user === null) {
        return res.status(400).json({ msg: "error" });
      }
       else {
        console.log("user found");
        return res.status(200).json({ user });
      }
    })
    .catch((err) => {
      return res.status(404).json({ msg: err });
    });
};

exports.login = (req, res) => {
  console.log(req.body)
  let { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user === null) {
        res.status(400).json({ msg: "email not found" });
        console.log("here")
      } else {
        console.log("user found");
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(400).json({ msg: " password is incorrect" });
            }
            console.log("isMatch");
            let access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(access_token, "secret", (err, decoded) => {
              if (err) {
                res.status(500).json({ err: err });
              }
              if (decoded) {
                return res.status(200).json({
                  success: true,
                  token: access_token,
                  message: user,
                });
              }
            });
          })
          .catch((err) => {
            res.status(500).json({ err: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    
    });
};
