import dotenv from 'dotenv';
import Server from './models/server';

//dotenv config
dotenv.config();

//Instance of the server
const server = new Server();

server.listen();