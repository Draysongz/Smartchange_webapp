import { NextApiRequest, NextApiResponse } from 'next';
import { httpServer } from './server';
import { Server } from 'socket.io';
import portscanner from 'portscanner'

let activeUsers = <any>[]

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log(" Connected Users", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});


export default async function handler(req: NextApiRequest, res: NextApiResponse){

  const port = 3001
  portscanner.checkPortStatus(port, '127.0.0.1', (err, status)=>{
    if(status === 'open'){
      console.log(`Port ${port} is open`)
      return;
    }
     httpServer.listen(port, ()=>{
    console.log('socket.io server is running on port 3002')
    
  });
  res.json('server running')
   })
 
}