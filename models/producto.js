const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    empresaid:{
        type:String,
        require: true
    },
    nombre: {
        type: String,
        require: true 
    }, 
    descripcion: {
        type: String,
        require: true 
    }, 
    //imagen:
    unidad_venta: {
        type: String,
        require: true 
    }, 
    precio: {
        type: Number,
        require: true 
    }, 
    cantidad: {
        type: Number,
        require:true,
        unique: true
    },    
    fecha_entrega: {
        type: String,
        require: true 
    },
    active: Boolean
});

module.exports = mongoose.model("Producto", ProductoSchema);