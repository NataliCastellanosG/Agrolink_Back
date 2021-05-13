const express = require("express");
const AsociacionController = require("../controllers/asociacion");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

//Petición para registrar asociacion
api.post(
  "/registrar-asociacion",
  [md_auth.ensureAuth],
  AsociacionController.registrarAsociacion
);
//Petición para obtener todas las asociaciones
api.get("/asociaciones", AsociacionController.obtenerAsociacionesActivas);

module.exports = api;
