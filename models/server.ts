import express, { type Application } from 'express';

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
    }

    //Port for the app to run
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on Port: ${this.port}`);
        } )
    }

}

export default Server;