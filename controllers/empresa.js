const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const Empresa = require("../models/empresa");
const { exists } = require("../models/empresa");

function registrarEmpresa(req, res) {
  const empresa = new Empresa();
  const {
    asociacion,
    rol,
    nombre,
    nit,
    representante_legal,
    cedula_representante_legal,
    correo_electronico,
    departamento,
    municipio,
    direccion_empresa,
    resena,
    video_presentacion,
    contrasena,
    repeatcontrasena,
  } = req.body;

  if (
    !asociacion ||
    !rol ||
    !nombre ||
    !nit ||
    !representante_legal ||
    !cedula_representante_legal ||
    !correo_electronico ||
    !departamento ||
    !municipio ||
    !direccion_empresa ||
    !resena ||
    !contrasena ||
    !repeatcontrasena
  ) {
    res.status(404).send({ message: "Los datos de la empresa son obligarios" });
  } else {
    empresa.asociacion = asociacion;
    empresa.rol = rol;
    empresa.nombre = nombre;
    empresa.nit = nit;
    empresa.representante_legal = representante_legal;
    empresa.cedula_representante_legal = cedula_representante_legal;
    empresa.correo_electronico = correo_electronico.toLowerCase();
    empresa.departamento = departamento;
    empresa.municipio = municipio;
    empresa.direccion_empresa = direccion_empresa;
    empresa.resena = resena;
    empresa.video_presentacion = video_presentacion;
    if (contrasena != repeatcontrasena) {
      res.status(404).send({ message: "Las contraseñas deben coincidir" });
    } else {
      bcrypt.hash(contrasena, null, null, function (err, hash) {
        if (err) {
          res.status(500).send({ message: "Error al encriptar la contraseña" });
        } else {
          empresa.contrasena = hash;
          empresa.active = true;

          empresa.save((err, empresaStored) => {
            if (err) {
              res.status(500).send({ message: "La empresa ya existe" });
            } else {
              if (!empresaStored) {
                res.status(400).send({ message: "Error al crear la empresa" });
              } else {
                res.status(200).send({
                  empresa: empresaStored,
                  message: "La empresa ha sido registrada con éxito",
                });
              }
            }
          });
        }
      });
    }
  }
}

function inicioSesion(req, res) {
  const params = req.body;
  const correo_electronico = params.correo_electronico.toLowerCase();
  const contrasena = params.contrasena;
  Empresa.findOne({ correo_electronico }, (err, empresaStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!empresaStored) {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else {
        bcrypt.compare(contrasena, empresaStored.contrasena, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor" });
          } else {
            if (!check) {
              res.status(404).send({ message: "La contraseña es incorrecta" });
            } else {
              if (!empresaStored.active) {
                res.status(200).send({
                  code: 200,
                  message: "El usuario no se encuentra activo",
                });
              } else {
                res.status(200).send({
                  accessToken: jwt.createAccessToken(empresaStored),
                  refreshToken: jwt.createRefreshToken(empresaStored),
                });
              }
            }
          }
        });
      }
    }
  });
}

function mostrarEmpresa(req, res) {
  Empresa.findById(
    { _id: req.params.id },
    "asociacion rol nombre nit representante_legal cedula_representante_legal correo_electronico departamento municipio direccion_empresa camara_comercio rut resena",
    (err, empresa) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." + err.message });
      } else {
        if (!empresa) {
          res.status(404).send({ message: "No se ha encontrado la empresa" });
        } else {
          res.status(200).send({ empresa });
        }
      }
    }
  );
}

function cargarCamaraComercio(req, res) {
  const params = req.params;
  Empresa.findById({ _id: params.id }, (err, empresaData) => {
    if (err) {
      res.status(500).send({ message: err.message + "Error del servidor." });
    } else {
      if (!empresaData) {
        res.status(404).send({ message: "No se ha encontrado ningun usuario" });
      } else {
        let empresa = empresaData;
        if (req.files) {
          let filePath = req.files.camara_comercio.path;
          let fileSplit = filePath.split("\\");
          let fileName = fileSplit[2];
          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpeg") {
            res.status(400).send({
              message:
                "La extención del documento es inválida. (Extenciones permitidas: .pdf, .jpg, .png)",
            });
          } else {
            empresa.camara_comercio = fileName;
            Empresa.findByIdAndUpdate(
              { _id: params.id },
              empresa,
              (err, empresaResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!empresaResult) {
                    res
                      .status(404)
                      .send({ message: "El usuario no ha sido encontrado" });
                  } else {
                    res.status(200).send({ camara_comercioName: fileName });
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

function cargarRut(req, res) {
  const params = req.params;
  Empresa.findById({ _id: params.id }, (err, empresaData) => {
    if (err) {
      res.status(500).send({ message: err.message + "Error del servidor." });
    } else {
      if (!empresaData) {
        res.status(404).send({ message: "No se ha encontrado ningun usuario" });
      } else {
        let empresa = empresaData;
        console.log(empresa);
        console.log(req.files);
        if (req.files) {
          let filePath = req.files.rut.path;
          let fileSplit = filePath.split("\\");
          console.log(fileSplit);
          let fileName = fileSplit[2];
          console.log("Name", fileName);
          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];
          console.log(fileExt);
          if (fileExt !== "png" && fileExt !== "jpeg") {
            res.status(400).send({
              message:
                "La extención del documento es inválida. (Extenciones permitidas: .pdf, .jpg, .png)",
            });
          } else {
            empresa.rut = fileName;
            Empresa.findByIdAndUpdate(
              { _id: params.id },
              empresa,
              (err, empresaResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!empresaResult) {
                    res
                      .status(404)
                      .send({ message: "El usuario no ha sido encontrado" });
                  } else {
                    res.status(200).send({ rutName: fileName });
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

function obtenerCamaraComercio(req, res) {
  const camara_comercioName = req.params.camara_comercioName;
  const filePath = "./documentos/camara_comercio/" + camara_comercioName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({ message: "El documento que buscas no existe" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

function obtenerRut(req, res) {
  const rutName = req.params.rutName;
  const filePath = "./documentos/rut/" + rutName;
  console.log(req);
  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({ message: "El documento que buscas no existe" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

function actualizarEmpresa(req, res) {
  const empresaData = req.body;
  const params = req.params;

  Empresa.findByIdAndUpdate(
    { _id: params.id },
    empresaData,
    (err, empresaResult) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!empresaResult) {
          res
            .status(404)
            .send({ message: "La empresa no ha sido encontrada." });
        } else {
          res
            .status(200)
            .send({ message: "Empresa actualizada de forma exitosa" });
        }
      }
    }
  );
}

function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userDeleted) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        res
          .status(200)
          .send({ message: "El usuario ha sido eliminado correctamente." });
      }
    }
  });
}

module.exports = {
  registrarEmpresa,
  inicioSesion,
  mostrarEmpresa,
  cargarCamaraComercio,
  cargarRut,
  obtenerCamaraComercio,
  obtenerRut,
  actualizarEmpresa,
};
