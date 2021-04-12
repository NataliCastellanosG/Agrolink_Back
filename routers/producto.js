const express = require("express");
const ProductoController = require("../controllers/producto");

const api = express.Router();

api.post("/registrar-producto", ProductoController.registrarProducto);

module.exports=api;