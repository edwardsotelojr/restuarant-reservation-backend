/*
    1. open terminal (terminal tab above).
    2. type "nodemon server" in the terminal to start backend server.
    Control+C to stop server.
*/
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});