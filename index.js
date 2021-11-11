
const routes = require("./routes/");
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
//const passport = require("passport");
//const cors = require('cors')
/*assuming an express app is declared here*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
//app.use(cors())
//app.use(
 // bodyParser.urlencoded({
   // extended: false
  //})
//);fdsfs
//test
//middlewares
//app.use(bodyParser.json());
<<<<<<< HEAD
//  
// test
// root
=======
// root fdfsadfsf
>>>>>>> 5e623df (test15)
// mongo password: pegvI3-puxnok-wymmuc
mongoose.connect("mongodb://127.0.0.1:27017/RRS").then(() => {
  console.log("Mongoose Connected. ");
})
.catch(err => console.log(err));

//app.use(passport.initialize());
//app.use(passport.session());
app.use('/', routes);
app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});


