import express from 'express';
import {SERVER_PORT} from "../global/environment";
import socketIO from "socket.io";
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;

    private httpServer: http.Server;



    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);

        // @ts-ignore
        this.io = socketIO(this.httpServer);

        this.listenSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {
        console.log('Listen connections');

        this.io.on('connection', client => {

            //Connect client
            socket.connectClient(client);

            // Config user
            socket.configUser(client);

           // Messages
            socket.message(client, this.io);

           //Desconectar
            socket.disconnect(client);
        });

    }

    public start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }
}
