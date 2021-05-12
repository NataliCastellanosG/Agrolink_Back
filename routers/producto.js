const express = require("express");
const ProductoController = require("../controllers/producto");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");
const md_cargar_imagen = multiparty({
  uploadDir: "./documentos/imagen",
});
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
//Petición para guardar la imagen del producto
api.put(
  "/cargar-imagen/:id",
  [md_auth.ensureAuth, md_cargar_imagen],
  ProductoController.cargarImagen
);
api.get(
  "/obtener-imagen/:imagenName",
  [md_auth.ensureAuth],
  ProductoController.obtenerImagen
);
api.put(
  "/actualizar-producto/:id",
  [md_auth.ensureAuth],
  ProductoController.actualizarProducto
);

module.exports = api;
