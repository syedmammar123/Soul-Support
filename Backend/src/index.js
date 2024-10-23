// import  dotenv from 'dotenv'
// dotenv.config();
// import connectDb from './db/index.js';
// import { app } from './app.js';

// const port = process.env.PORT || 3000;
// connectDb().then(()=>{
//     app.on("error",(error)=>{
//         console.log("Error:",error);
//         throw error;
//     })
//     app.listen(port,()=>{
//         console.log(`Server running on http://localhost:${port}`);
//     })
// }).catch(
//     (err)=>{console.log("MongoDb connection failed!",err)}
// )


import dotenv from 'dotenv';
dotenv.config();
import connectDb from './db/index.js';
import { app } from './app.js';
import { createServer } from 'http';  
import { Server } from 'socket.io';  

const port = process.env.PORT || 3000;
const server = createServer(app); 
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3001', 'http://localhost:3000'],
    credentials: true
  }
});
export { io };

// Set up socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (messageData) => {
    // Emit message to other users
    io.emit('receiveMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

connectDb().then(() => {
  app.on('error', (error) => {
    console.log('Error:', error);
    throw error;
  });
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.log('MongoDb connection failed!', err);
});
