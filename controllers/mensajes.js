const Mensaje = require('../models/mensaje');

const obtenerMensajes = async(req, res) => {
    //el id es el de el usuario al que se le enviaron los mensajes
    const miId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
            $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }]
        })
        .sort({ createdAt: 'asc' })
        .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    });
}

const crearMensaje = async(req, res) => {
    try {
        const mensaje = new Mensaje(req.body);
        await mensaje.save();
        res.status(200).json({
            ok: true,
            mensaje
        });
        console.log('hurrah');
    } catch (error) {
        res.status(400).json({
            ok: true,
            msg: 'Error al guardar mensaje'
        });
    }
}

module.exports = {
    obtenerMensajes,
    crearMensaje
}