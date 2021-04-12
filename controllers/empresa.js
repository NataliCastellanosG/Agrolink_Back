const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

const Empresa = require("../models/empresa");

function registrarEmpresa(req, res){
    
    const empresa = new Empresa();
    const{ asociacion, rol,  nombre, nit, representante_legal, cedula_representante_legal, correo_electronico, departamento, 
           municipio, direccion_empresa, resena, video_presentacion, contrasena , repeatcontrasena }= req.body;
    
    if(!asociacion || !rol || !nombre || !nit || !representante_legal || !cedula_representante_legal || 
       !correo_electronico ||!departamento || !municipio || !resena || !contrasena || !repeatcontrasena){
        res.status(404).send({message:"Los datos de la empresa son obligarios"});
    }
    else{
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
        if(contrasena!=repeatcontrasena)
        {
            res.status(404).send({message:"Las contraseñas deben coincidir"});
        }
        else{
            bcrypt.hash(contrasena, null, null, function(err, hash) {
                if(err){
                    res.status(500).send({message:"Error al encriptar la contraseña"});
                }
                else
                {
                    empresa.contrasena = hash;
                    empresa.active =true;

                    console.log(empresa.contrasena);

                    empresa.save((err, empresaStored)=>{
                        console.log(empresaStored)
                        if(err){
                            res.status(500).send({message:"La empresa ya existe"});
                        }
                        else{
                            if(!empresaStored){
                                res.status(400).send({message:"Error al crear la empresa"});
                            }
                            else{
                                res.status(200).send({empresa:empresaStored, message:"La empresa ha sido registrada con éxito"});
                            }
                        }
                    });
                }
            });
        }
    }
}

function inicioSesion(req, res){
    const params = req.body;
    const correo_electronico = params.correo_electronico.toLowerCase();
    const contrasena = params.contrasena;

    Empresa.findOne({correo_electronico}, (err, empresaStored) => {
        if(err){
            res.status(500).send({message: "Error del servidor"});
        }else{
            if(!empresaStored){
                res.status(404).send({message: "Usuario no encontrado"});
            }else{
                bcrypt.compare(contrasena, empresaStored.contrasena, (err, check) =>{
                    if(err){
                        res.status(500).send({message: "Error del servidor"});
                    }else{
                        if(!check){
                            res.status(404).send({message: "La contraseña es incorrecta"});
                        }else{
                            if(!empresaStored.active){
                                res.status(200).send({code: 200, message: "El usuario no se encuentra activo"});
                            }else{
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

module.exports = {
    registrarEmpresa,
    inicioSesion
};