const express = require("express");
const ProductoController = require("../controllers/producto");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

//Petición para registrar producto
api.post(
  "/registrar-producto/:empresaid",
  [md_auth.ensureAuth],
  ProductoController.registrarProducto
);
//Petición para obtener todos los productos
api.get(
  "/productos/:empresaid",
  [md_auth.ensureAuth],
  ProductoController.obtenerProductos
);
//Petición para obtener todos los productos activos
api.get(
  "/productosActivos/:empresaid",
  [md_auth.ensureAuth],
  ProductoController.obtenerProductosActivos
);
module.exports = api;
