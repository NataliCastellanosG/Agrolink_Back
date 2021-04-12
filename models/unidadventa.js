const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnidadventaSchema = Schema({
    unidad: {
        type: String,
        unique: true
    },
    active: Boolean
});

module.exports= mongoose.model("UnidadVenta", UnidadventaSchema);
