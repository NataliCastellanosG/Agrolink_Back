const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

//Load routings
//const userRoutes = require("./routers/user");
const authRoute = require("./routers/auth");
const empresaRoute = require("./routers/empresa");
const productoRoute = require("./routers/producto");
const asociacionRoute = require("./routers/asociacion");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//----

//Router Basic
app.use(`/api/${API_VERSION}`, authRoute);
app.use(`/api/${API_VERSION}`, empresaRoute);
app.use(`/api/${API_VERSION}`, productoRoute);
app.use(`/api/${API_VERSION}`, asociacionRoute);

module.exports = app;
