const express = require("express");
const CompraController = require("../controllers/compra");

const api = express.Router();

api.post("/registrar-compra", CompraController.registrarCompra);

module.exports=api;