const express = require("express");
const ProductoController = require("../controllers/producto");

const api = express.Router();

api.post("/registrar-producto", ProductoController.registrarProducto);
api.get("/productos", ProductoController.obtenerProductos);
module.exports=api;