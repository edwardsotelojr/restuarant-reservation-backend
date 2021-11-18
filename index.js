
const routes = require("./routes/");
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express();
const PORT = 8000;
// root fdfsadfsf
// mongo password: pegvI3-puxnok-wymmuc
mongoose.connect("mongodb://127.0.0.1:27017/RRS",
{useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => console.log("Db connected"))
.catch(err => console.log(err));
app.use(bodyParser.json())
app.use(cors())
app.use('/', routes);
app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});


