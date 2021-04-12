//const jwt = require

const Producto = require("../models/producto");

function registrarProducto(req, res){
    
    const producto = new Producto();
    const{ empresaid, nombre, descripcion, unidad_venta, precio, cantidad, fecha_entrega}= req.body;
    
    if(!empresaid || !nombre || !descripcion || !unidad_venta || !precio || !cantidad || !fecha_entrega){
        res.status(404).send({message:"Los datos del producto son obligarios"});
    }
    else{
        producto.empresaid=empresaid;
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.unidad_venta = unidad_venta;
        producto.precio = precio;
        producto.cantidad = cantidad;
        producto.fecha_entrega = fecha_entrega;
        producto.active =true;

        producto.save((err, productoStored)=>{
            if(err){
                res.status(500).send({message:"El producto ya existe"});
            }
            else{
                if(!productoStored){
                    res.status(400).send({message:"Error al registrar el producto"});
                }
                else{
                    res.status(200).send({producto:productoStored, message:"El producto ha sido registrado con éxito"});
                }
            }
        });   
    }
}

module.exports = {
    registrarProducto
};