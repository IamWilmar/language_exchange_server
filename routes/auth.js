/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//Ruta para crear usuario
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La clave es obligatoria').not().isEmpty(),
    validarCampos
], crearUsuario);

//Ruta para hace login
router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La clave es obligatoria').not().isEmpty(),
], login);

//Generacion de nuevo JWT
//Validacion JWT
router.get('/renew', validarJWT, renewToken);
module.exports = router;