//const jwt = require
const Compra = require("../models/compra");

function registrarCompra(req, res){
    
    const compra = new Compra();
    
    const{ empresa_Comprador_id, producto_id, cantidad_comprada ,medio_pago, forma_pago, cuotas, fecha_entrega}= req.body;
    
    if(!empresa_Comprador_id || !producto_id || !cantidad_comprada || !medio_pago || !forma_pago || !cuotas || !fecha_entrega){
        res.status(404).send({message:"Los datos de la compra son obligarios"});
    }
    else{
        compra.empresa_Comprador_id = empresa_Comprador_id;
        compra.producto_id = producto_id;
        compra.cantidad_comprada = cantidad_comprada;
        compra.medio_pago = medio_pago;
        compra.forma_pago = forma_pago;
        compra.cuotas = cuotas;
        compra.fecha_entrega = fecha_entrega;
        compra.active =true;

        compra.save((err, compraStored)=>{
            if(err){
                res.status(500).send({message:"La compra ya ha sido registrada"});
            }
            else{
                if(!compraStored){
                    res.status(400).send({message:"Error al registrar la compra"});
                }
                else{
                    res.status(200).send({compra:compraStored, message:"La compra ha sido registrada con éxito"});
                }
            }
        });   
    }
}

module.exports = {
    registrarCompra
};