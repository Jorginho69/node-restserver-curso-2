const express = require('express');
const cors = require('cors');

class Server {

    constructor () {
        
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Routes applications
        this.routes();

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo
        this.app.use ( express.json() );

        // Directorio publico
        this.app.use( express.static('public')  );
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("🚀 ~ file: server.js:26 ~ Server ~ this.app.listen ~ port:", this.port);            
        } );
    }

}


module.exports = Server;