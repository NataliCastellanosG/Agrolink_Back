const bcrypt = require("bcrypt-nodejs");
//const jwt = require

const User = require("../models/user");

function signUp(req, res){
    const user = new User();
    const{ name, lastname, email, password, repeatPassword}= req.body;
    user.name = name;
    user.lastname=lastname;
    user.email= email;
    user.role = "admin";
    user.active = false;

    if(!password || !repeatPassword){
        res.status(404).send({message:"Las contraseñas son obligarias"});
    }
    else{
        if(password!=repeatPassword)
        {
            res.status(404).send({message:"Las contraseñas deben ser iguales"});
        }
        else{
            bcrypt.hash(password, null, null, function(err, hash) {
                if(err){
                    res.status(500).send({message:"Error al encriptar la contraseña"});
                }
                else
                {
                    user.password = hash;

                    user.save((err, userStored)=>{
                        if(err){
                            res.status(500).send({message:"El usuario ya existe"});
                        }
                        else{
                            if(!userStored){
                                res.status(400).send({message:"Error al crear el usuario"});
                            }
                            else{
                                res.status(200).send({user:userStored});
                            }
                        }
                    });
                }
            });
        }
    }

}

module.exports = {
    signUp
};