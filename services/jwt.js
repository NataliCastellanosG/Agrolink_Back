const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY ="alb2bum2021nmkst";

exports.createAccessToken = function(empresa){
    const payload={
        id: empresa._id,
        rol: empresa.rol,
        nombre: empresa.nombre,
        nit: empresa.nit,
        createToken: moment().unix(),
        exp: moment().add(3, "hours").unix()
    };

    return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = function(empresa){

    const payload={
        id: empresa._id,
        exp: moment().add(30, "days").unix()
    };

    return jwt.encode(payload, SECRET_KEY);
};

exports.decodeToken = function(token){
    return jwt.decode(token, SECRET_KEY, true);
}