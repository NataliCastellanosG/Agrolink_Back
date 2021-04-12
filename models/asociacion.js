const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AsociacionSchema = Schema ({
    nombre: {
        type : String,
        require : true 
    }, 
    nit: {
        type : String,
        require :true,
        unique : true
    },
    active: Boolean
});

module.exports = mongoose.model("Asociacion", AsociacionSchema);