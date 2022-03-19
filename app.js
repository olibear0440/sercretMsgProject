/*
  * import et creation app Express

  * import routeur
  * ajout du middleware cors
*/
const express = require("express");
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");

const userRoutes = require("./routes/user");

const app = express();


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    next();
  });

app.use(express.json());
app.use(morgan("dev"));

//middleware dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", userRoutes);

module.exports = app;
