import { Server } from 'socket.io';
import { createServer } from 'http';



export const httpServer = createServer((req, res)=>{
    res.writeHead(200);
    // res.end("Socket.io is running")
}
);
