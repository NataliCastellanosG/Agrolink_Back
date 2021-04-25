const express = require("express");
const ProductoController = require("../controllers/producto");

const api = express.Router();

api.post(
  "/registrar-producto/:empresaid",
  ProductoController.registrarProducto
);
api.get("/productos", ProductoController.obtenerProductos);
module.exports = api;
