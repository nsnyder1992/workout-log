//environment
require("dotenv").config();

//express
const express = require("express");
const app = express();

//database
const sequelize = require("./db");
sequelize.sync();

//controllers
const user = require("./controllers/user-controller");
const log = require("./controllers/log-controller");

//headers
app.use(require("./middleware/headers"));

//use json (enable to get res.body)
app.use(express.json());

////////////////////////////////////////////////
//Exposed Routes
////////////////////////////////////////////////
app.use("/user", user);

////////////////////////////////////////////////
//Protected Routes
////////////////////////////////////////////////
app.use(require("./middleware/validate-session"));
app.use("/log", log);

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
