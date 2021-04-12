const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpresaSchema = Schema({
    asociacion: {
        type: String,
        require: true 
    }, 
    rol: {
        type: String,
        require: true 
    }, 
    nombre: {
        type: String,
        require: true 
    }, 
    nit: {
        type: String,
        require:true,
        unique: true
    },    
    representante_legal: {
        type: String,
        require: true 
    }, 
    cedula_representante_legal: {
        type: String,
        require: true 
    }, 
    correo_electronico: {
        type: String,
        require: true 
    },
    departamento: {
        type: String,
        require: true 
    }, 
    municipio: {
        type: String,
        require: true 
    },
    direccion_empresa: {
        type: String,
        require: true 
    },
    //certificado_cc
    //rut
    resena: {
        type: String,
        require: true 
    }, 
    video_presentacion: String,

    contrasena: {
        type: String,
        require: true 
    },
    active: Boolean
});

module.exports = mongoose.model("Empresa", EmpresaSchema);