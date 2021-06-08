const { response } = require('express');
const Usuario = require('../models/usuario');
/**Test tocheck commit user  */
/**Second test as I am Wilmar */
const getUsuarios = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    //quey para devolver todos los usuarios por filtro sin devolver el usuario que llama
    const usuarios = await Usuario.find({ _id: { $ne: req.uid } }).sort('nombre').skip(desde).limit(20);

    return res.json({
        ok: true,
        usuarios,
    });
}

module.exports = {
    getUsuarios
}