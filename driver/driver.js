'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

socket.on('pickup',payload=>{
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderId}`);
    socket.emit('in-transit', payload);
  }, 1000);

  setTimeout(()=>{
    console.log(`deliverd ${payload.orderId}`);
    socket.emit('deliverd',payload);

  }, 3000);

});
