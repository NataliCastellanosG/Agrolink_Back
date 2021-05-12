const express = require("express");
const EmpresaController = require("../controllers/empresa");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");
const md_cargar_cc = multiparty({
  uploadDir: "./documentos/camara_comercio",
});
const md_cargar_rut = multiparty({
  uploadDir: "./documentos/rut",
});
const api = express.Router();

api.post("/sign-up", EmpresaController.registrarEmpresa);
api.post("/sign-in", EmpresaController.inicioSesion);
api.get("/empresa/:id", [md_auth.ensureAuth], EmpresaController.mostrarEmpresa);
api.put(
  "/cargar-cc/:id",
  [md_auth.ensureAuth, md_cargar_cc],
  EmpresaController.cargarCamaraComercio
);
api.put(
  "/cargar-rut/:id",
  [md_auth.ensureAuth, md_cargar_rut],
  EmpresaController.cargarRut
);
api.get(
  "/obtener-cc/:camara_comercioName",
  [md_auth.ensureAuth],
  EmpresaController.obtenerCamaraComercio
);
api.get(
  "/obtener-rut/:rutName",
  [md_auth.ensureAuth],
  EmpresaController.obtenerRut
);
api.put(
  "/actualizar-empresa/:id",
  [md_auth.ensureAuth],
  EmpresaController.actualizarEmpresa
);

module.exports = api;
