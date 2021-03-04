/* 
    path /api/mensajes
*/

const { Router } = require("express");
const { obtenerMensajes, crearMensaje } = require("../controllers/mensajes");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

//valdar jwt
router.get('/:de', validarJWT, obtenerMensajes);
router.post('/new', validarJWT, crearMensaje);
module.exports = router;