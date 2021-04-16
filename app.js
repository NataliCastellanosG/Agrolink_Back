const express = require("express");
const bodyParser = require("body-parser")

const app = express();
const {API_VERSION} = require("./config");

//Load routings
//const userRoutes = require("./routers/user");
const authRoute = require ('./routers/auth');
const empresaRoute = require("./routers/empresa");
const productoRoute = require("./routers/producto");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Configure Header HTTP
//----

//Router Basic
app.use(`/api/${API_VERSION}`, authRoute);
app.use(`/api/${API_VERSION}`, empresaRoute);
app.use(`/api/${API_VERSION}`, productoRoute);

module.exports = app;
