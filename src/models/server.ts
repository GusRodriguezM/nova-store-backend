import express, { type Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/users';
import authRoutes from '../routes/auth';
import dbConnection from '../database/config';

interface APIPaths {
    users: string;
    auth: string;   
}

class Server {

    private app: Application;
    private port: string;
    private apiPaths: APIPaths = {
        users: '/api/users',
        auth: '/api/auth'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        //DB connection
        this.connectionToDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectionToDB() {
        await dbConnection();
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


    //App routes
    routes() {
        this.app.use( this.apiPaths.auth, authRoutes )
        this.app.use( this.apiPaths.users, userRoutes );
    }

    //Port for the app to run
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on Port: ${this.port}`);
        })
    }

}

export default Server;