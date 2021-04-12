const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediopagoSchema = Schema({
    medio: {
        type: String,
        unique: true
    },
    active: Boolean
});

module.exports= mongoose.model("MedioPago", MediopagoSchema);