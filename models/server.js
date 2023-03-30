const express = require('express');
const mongoose = require('mongoose');

class Server {
    constructor() {
        this.app = express();
        //acceder a la variable de entorno correspondiente al puerto
        this.port = process.env.PORT;
        this.app.set('view engine', 'pug');

        this.app.use(express.urlencoded({ extended: true}));
        this.app.use(express.json());

        this.routes();
         //conectar base de datos con la ruta del archivo.env
         mongoose.connect(process.env.MONGODB, console.log('Base de datos conectada.'));
        
    }

    //Método para llamar las rutas de la aplicación
    routes() {
        this.app.use('/', require('../routes/routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });

    }

}

module.exports = Server;