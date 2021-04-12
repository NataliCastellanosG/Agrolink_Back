const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FechapagoSchema = Schema({
    compra: String,
    fecha: Date,
});

module.exports= mongoose.model("FechaPago", FechapagoSchema);