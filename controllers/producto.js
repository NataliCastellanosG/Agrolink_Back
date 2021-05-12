const fs = require("fs");
const path = require("path");
const Producto = require("../models/producto");

function registrarProducto(req, res) {
  console.log(req.files);
  const producto = new Producto();
  const {
    empresaid,
    nombre,
    descripcion,
    unidad_venta,
    precio,
    cantidad,
    fecha_entrega,
  } = req.body;

  if (
    !empresaid ||
    !nombre ||
    !descripcion ||
    !unidad_venta ||
    !precio ||
    !cantidad ||
    !fecha_entrega
  ) {
    res.status(404).send({ message: "Los datos del producto son obligarios" });
  } else {
    producto.empresaid = empresaid;
    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.unidad_venta = unidad_venta;
    producto.precio = precio;
    producto.cantidad = cantidad;
    producto.fecha_entrega = fecha_entrega;
    producto.active = true;

    producto.save((err, productoStored) => {
      if (err) {
        res.status(500).send({ message: "El producto ya existe" });
      } else {
        if (!productoStored) {
          res.status(400).send({ message: "Error al registrar el producto" });
        } else {
          res.status(200).send({
            producto: productoStored,
            message: "El producto ha sido registrado con éxito",
          });
        }
      }
    });
  }
}

function obtenerProductos(req, res) {
  Producto.find().then((productos) => {
    if (!productos) {
      res.status(404).send({ message: "No existen productos registrados" });
    } else {
      res.status(200).send({ productos });
    }
  });
}

function obtenerProductosActivos(req, res) {
  const query = req.query;

  Producto.find({
    empresaid: req.params.empresaid,
    active: query.active,
  }).then((productos) => {
    if (!productos) {
      res.status(404).send({ message: "No existen productos registrados" });
    } else {
      res.status(200).send({ productos });
    }
  });
}

function cargarImagen(req, res) {
  const params = req.params;
  Producto.findById({ _id: params.id }, (err, productoData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!productoData) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun producto" });
      } else {
        let producto = productoData;
        if (req.files) {
          let filePath = req.files.camara_comercio.path;
          let fileSplit = filePath.split("\\");
          let fileName = fileSplit[2];
          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpeg") {
            res.status(400).send({
              message:
                "La extención del documento es inválida. (Extenciones permitidas: .jpg ó .png)",
            });
          } else {
            producto.imagen = fileName;
            Producto.findByIdAndUpdate(
              { _id: params.id },
              producto,
              (err, productoResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!productoResult) {
                    res
                      .status(404)
                      .send({ message: "El producto no ha sido encontrado" });
                  } else {
                    res.status(200).send({ imagenName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function obtenerImagen(req, res) {
  const imagenName = req.params.imagenName;
  const filePath = "./documentos/imagen/" + imagenName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({ message: "El documento que buscas no existe" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

function actualizarProducto(req, res) {
  const productoData = req.body;
  const params = req.params;

  Producto.findByIdAndUpdate(
    { _id: params.id },
    productoData,
    (err, productoResult) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!productoResult) {
          res
            .status(404)
            .send({ message: "El producto no ha sido encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "Producto actualizado de forma exitosa" });
        }
      }
    }
  );
}

module.exports = {
  registrarProducto,
  obtenerProductos,
  obtenerProductosActivos,
  cargarImagen,
  obtenerImagen,
  actualizarProducto,
};
