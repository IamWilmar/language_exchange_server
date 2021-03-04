const { response } = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const borrarUsuario = async(req, res = response) => {
    const id = req.params.id;
    const token = req.header('x-token');
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    try {
        if (uid === id) {
            await Usuario.findByIdAndDelete(id);
            res.status(200).json({
                ok: true,
                msg: 'Usuario eliminado'
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'No se encontro usuario'
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
    borrarUsuario
}