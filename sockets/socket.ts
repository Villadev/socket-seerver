import {Socket} from 'socket.io';
import socketIO from "socket.io";
import {UsersList} from "../classes/users-list";
import {User} from "../classes/user";

export const usuariosConnected = new UsersList();

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Disconnected Client');
        usuariosConnected.deleteUser(client.id);
    });
};

export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: {de: string, message: string}) => {
        console.log('Message: ' + payload.message);
        io.emit('new-message', payload);
    });
};

export const configUser = (client: Socket) => {
    client.on('configurar-usuario', (payload: {nombre: string},  callback: Function) => {
        usuariosConnected.refreshName(client.id, payload.nombre);
        callback({
            ok: true,
            message: `User ${payload.nombre}, ID: ${usuariosConnected.getUser(client.id)}`
        });
    });
};

export const connectClient = (client: Socket) => {
    const usuario = new User(client.id);
    usuariosConnected.add(usuario);
}
