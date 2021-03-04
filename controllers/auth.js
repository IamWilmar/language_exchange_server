const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);
        //Ecriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        //Grabasr en db
        await usuario.save();
        //GENERAR JWT(JSON WEB TOKEN)
        const token = await generarJWT(usuario.id);
        //ENVIAR RESPUESTA
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        //Validar Password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //GENERAR EL JWT
        const token = await generarJWT(usuario.id);

        //ENVIAR RESPUESTA
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al hacer login'

        });
    }
}


const renewToken = async(req, res = response) => {
    const uid = req.uid;
    //Generar Nuevo Token
    const token = await generarJWT(uid);
    //Encontrar el usuario
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: true,
        usuario,
        token
    });
}


module.exports = {
    crearUsuario,
    login,
    renewToken
}