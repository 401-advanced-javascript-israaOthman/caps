'use strict';

// const uuid = require('uuid-random');
const io = require('socket.io')(3000);

io.on('connection',(socket)=>{
  console.log('CORE',socket.io);
});

const caps = io.of('/caps');
caps.on('connection',(socket)=>{
  console.log('Connected',socket.id);

  socket.on('join',room =>{
    console.log('registerd as ',room);
    socket.join(room);
  });

  socket.on('pickup',payload=>{
    logIt('pickup',payload);
    caps.emit('pickup',payload);
  });

  socket.on('in-transit',payload=>{
    logIt('in-transit',payload);
    caps.to(payload.storeName).emit('in-transit',payload);
  });

  socket.on('deliverd',payload=>{
    logIt('deliverd',payload);
    caps.to(payload.storeName).emit('deliverd',payload);
  });

});

function logIt(event,payload){
  let time = new Date();
  console.log('EVENT: ',{time,event,payload});

}

