require("dotenv").config();
const express = require("express");
const cors = require('cors');
const {cookie} = require("express-validator");
var cookieParser = require('cookie-parser')
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

require("./db/connection");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require("./routes/routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
    if (error) return handleError(error);
    else return console.log(`App - http://localhost:${PORT} `);
});

