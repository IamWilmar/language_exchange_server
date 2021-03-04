/*
    path /api/contacts
*/

const { Router } = require("express");
const { obtenerContactos } = require("../controllers/contacts");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', validarJWT, obtenerContactos);

module.exports = router;