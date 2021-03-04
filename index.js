const express = require('express');
const path = require('path');
require('dotenv').config();

//DB config
const { dbConnection } = require('./database/config');
dbConnection();
//App de express
const app = express();
//Lectura y parse del body
app.use(express.json());
//Node Server
const server = require('http').createServer(app);
//Path public
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Mis Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/delete', require('./routes/delete'));
app.use('/api/edit', require('./routes/edit'));
app.use('/api/mensajes', require('./routes/mensajes'));
app.use('/api/contacts', require('./routes/contacts'));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);
});