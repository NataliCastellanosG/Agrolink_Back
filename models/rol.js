const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolSchema = Schema({
    nombre:{
        type: String,
        unique: true
    },
    active: Boolean
});

module.exports = mongoose.model("Rol", RolSchema);