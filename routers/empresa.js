const express = require("express");
const EmpresaController = require("../controllers/empresa");
const Empresa = require("../models/empresa");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.post("/sign-up", EmpresaController.registrarEmpresa);
api.post("/sign-in", EmpresaController.inicioSesion);

api.get("/empresa/:id",[md_auth.ensureAuth], EmpresaController.mostrarEmpresa);

module.exports=api;