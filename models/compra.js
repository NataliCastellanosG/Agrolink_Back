const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompraSchema = Schema({
    empresa_Comprador_id:{
        type: String,
        require: true
    },
    producto_id:{
        type: String,
        require: true
    },
    cantidad_comprada:{
        type: String,
        require: true
    },
    medio_pago:{
        type: String,
        require: true
    },
    forma_pago:{
        type: String,
        require: true
    },
    cuotas:{
        type: Number,
        require: true
    },
    fecha_entrega:{
        type: Date,
        require: true
    },
});

module.exports = mongoose.model("Compra",CompraSchema);