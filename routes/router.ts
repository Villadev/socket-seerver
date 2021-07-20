import {Router, Request, Response} from "express";
import Server from "../classes/server";

export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de ;
    const id = req.params.id;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    };

    server.io.emit('new-message', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de ;
    const id = req.params.id;

    const server = Server.instance;

    const payload = {
      de,
      cuerpo
    };

    server.io.in(id).emit('private-message', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

