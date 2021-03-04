/*
    path: api/edit
*/
const { Router } = require('express');
const { editarUsuario } = require('../controllers/edit');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//Editar usuario
router.patch('/:id', validarJWT, editarUsuario);

module.exports = router;