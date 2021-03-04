const { response } = require('express');
const Mensaje = require('../models/mensaje');
const Usuario = require('../models/usuario');

//TODO: esto es algo que hay que arreglar, simplemente no esta funcionando

const obtenerContactos = async(req, res = response) => {
    //el id es el de el usuario al que se le enviaron los mensajes
    const miId = req.uid;
    var userArray = [];
    const last30 = await Mensaje.find({
            $or: [{ de: miId }, { para: miId }]
        })
        .sort({ createdAt: 'asc' })
        .limit(30);

    const usuario = await Usuario.findById(last30[0].de);

    userArray.forEach((elem) => {
        console.log(elem.nombre);
    });
    res.json({
        ok: true,
        mensajes: usuario
    });
}

module.exports = {
    obtenerContactos
}