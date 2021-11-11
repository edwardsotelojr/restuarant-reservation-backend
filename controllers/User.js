// in Visual Studio Code terminal, type npm i 
const User = require("../models/User");
const bcrypt = require("bcrypt");

// test http post request with Postman
exports.signup = async (req, res) => {
    const { email, name, password, phone, mailingAddress, 
        billingAddress, preferredAmountOfDiners
    } = req.body
  
    User.findOne({email: email})
    .then(user => {
      if(user){
        return res.status(400).json({error: "email already exists"});
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
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(user => {res.json(user); console.log("user saved.")})
          .catch(err => console.log(err));
        });
      });
    });
  };
  