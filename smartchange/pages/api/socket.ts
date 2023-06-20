import { NextApiRequest, NextApiResponse } from 'next';
import WebSocket from 'ws';
let activeUsers = <any>[];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const wss = new WebSocket.Server({ noServer: true });

  // WebSocket connection handling
  wss.on('connection', (socket) => {

    socket.on('open', ()=>{
      console.log('WebSocket connection established.');

      socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
          activeUsers.push({ userId: newUserId, socketId: socket.id });
          console.log(" Connected Users", activeUsers);
  
  
          socket.send(JSON.stringify({ event: 'get-users', data: activeUsers }));
  
        }})
    })
   

    socket.on('message', (message) => {
      console.log('Received message:', message);

      // Process the message and send a response back to the client
      socket.send('Hello, client!');

      // Process the received message and send it to the appropriate user
      const data = JSON.parse(message);
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        socket.send(JSON.stringify({ event: 'receive-message', data }));
      }
    });

    socket.on('close', () => {
      console.log('WebSocket connection closed.');

      // Remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log('User Disconnected', activeUsers);
    });
  });

  // Upgrade HTTP request to a WebSocket connection
  if ((req as any).socket.server.websocketServer === undefined) {
    (req as any).socket.server.websocketServer = wss;
    wss.handleUpgrade(req, (req as any).socket, Buffer.alloc(0), onUpgrade);
  }

  function onUpgrade(res) {
    res.end();
  }
}
