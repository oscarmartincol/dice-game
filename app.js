
//Obtener variables de entorno con número de puerto y link a la base de datos de Mongodb Atlas
require('dotenv').config();
const Server = require('./models/server');

const server = new Server;
