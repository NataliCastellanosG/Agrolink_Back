const express = require("express");
const EmpresaController = require("../controllers/empresa");

const api = express.Router();

api.post("/sign-up", EmpresaController.registrarEmpresa);
api.post("/sign-in", EmpresaController.inicioSesion);

module.exports=api;