const express = require("express");
const EmpresaController = require("../controllers/empresa");
const Empresa = require("../models/empresa");
const api = express.Router();

api.post("/sign-up", EmpresaController.registrarEmpresa);
api.post("/sign-in", EmpresaController.inicioSesion);

api.get("/empresa", EmpresaController.mostrarEmpresa);

module.exports=api;