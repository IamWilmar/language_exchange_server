const { response } = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const editarUsuario = async(req, res = response) => {
    const id = req.params.id;
    //const usuario = new Usuario(req.body);
    const token = req.header('x-token');
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    try {
        if (uid === id) {
            await Usuario.findByIdAndUpdate(id, req.body);
            console.log("enter");
            res.status(200).json({
                ok: true,
                msg: 'edicion realizada',
            });
        } else {
            res.status(404).json({
                ok: true,
                msg: 'No se puedo realizar el proceso'
            });
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error interno'
        });
    }
}


module.exports = {
    editarUsuario
}