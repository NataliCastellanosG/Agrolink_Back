const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormapagoSchema = Schema({
    forma: {
        type: String,
        unique: true
    },
    active: Boolean
});

module.exports= mongoose.model("FormaPago", FormapagoSchema);