const jwt = require("../services/jwt");
const moment = require("moment");
const Empresa = require("../models/empresa");
const { collection } = require("../models/empresa");

function willExpiredToken(token){
    const {exp} = jwt.decodeToken(token);
    const currentDate = moment().unix();

    if(currentDate > exp){
        return true;
    }
    return false;
}

function refreshAccessToken(req, res){
    const { refreshToken } = req.body;
    const isTokenExpired = willExpiredToken(refreshToken);
    console.log(isTokenExpired);
    if(isTokenExpired){
        res.status(404).send({message: "El token ha expirado"});
    }else{
        const { id } = jwt.decodeToken(refreshToken);
        
        Empresa.findOne({_id: id}, (err, empresaStored) => {
            if(err){
                res.status(500).send({message: "Error del servidor"});
            }else{
                if(!empresaStored){
                    res.statud(404).send({message: "El usuario no ha sido encontrado"});
                }else{
                    res.status(200).send({
                        accessToken: jwt.createAccessToken(empresaStored),
                        refreshToken: refreshToken
                    })
                }

            }
        });
    }
}

module.exports = {
    refreshAccessToken
}