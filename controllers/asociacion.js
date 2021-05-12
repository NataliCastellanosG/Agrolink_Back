const Asociacion = require("../models/asociacion");

function registrarAsociacion(req, res) {
  const asociacion = new Asociacion();
  const { nombre, nit } = req.body;

  if (!nombre || !nit) {
    res
      .status(404)
      .send({ message: "Los datos de la asociación son obligarios" });
  } else {
    asociacion.nombre = nombre;
    asociacion.nit = nit;
    asociacion.active = true;

    asociacion.save((err, asociacionStored) => {
      if (err) {
        res.status(500).send({ message: "La asociacion ya existe" });
      } else {
        if (!asociacionStored) {
          res.status(400).send({ message: "Error al registrar la asociacion" });
        } else {
          res.status(200).send({
            asociacion: asociacionStored,
            message: "La asociacion ha sido registrada con éxito",
          });
        }
      }
    });
  }
}

function obtenerAsociacionesActivas(req, res) {
  const query = req.query;
  Asociacion.find({
    active: query.active,
  }).then((asociaciones) => {
    if (!asociaciones) {
      res.status(404).send({ message: "No existen asociaciones registrados" });
    } else {
      res.status(200).send({ asociaciones });
    }
  });
}

module.exports = {
  registrarAsociacion,
  obtenerAsociacionesActivas,
};
