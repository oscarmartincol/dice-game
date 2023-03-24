const express = require('express');

class Server {
    constructor() {
        this.app = express();

        this.app.get('/',(req, res) => {
            res.send('Hola mundo');
        });

        this.app.listen(8080);
    }

}

module.exports = Server;