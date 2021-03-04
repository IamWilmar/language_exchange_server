/*
    path: api/delete
*/
const { Router } = require('express');
const { borrarUsuario } = require('../controllers/delete');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//Ruta para borrar usuario
router.delete('/:id', validarJWT, borrarUsuario);


module.exports = router;