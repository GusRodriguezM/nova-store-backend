import express, { type Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/users';

interface APIPaths {
    users: string
}

class Server {

    private app: Application;
    private port: string;
    private apiPaths: APIPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    //App routes
    routes() {
        this.app.use( this.apiPaths.users, userRoutes );
    }

    //Middlewares
    middlewares() {
        //CORS
        this.app.use( cors() );

        //Parsing the body
        this.app.use( express.json() );

        //Public folder
        this.app.use( express.static('public') );
    }

    //Port for the app to run
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on Port: ${this.port}`);
        } )
    }

}

export default Server;