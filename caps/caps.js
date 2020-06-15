'use strict';

require('dotenv').config();


const net = require('net');
const uuid = require('uuid-random');

const PORT = process.env.PORT || 3030;
const server = net.createServer();

server.listen(PORT,()=> console.log(`listning to port ${PORT}`));


let sockeetPool ={};

server.on('connection',(socket)=>{
  
  const id = `Socket-${uuid()}`; 
  console.log(`client with ID : ${id} is connected!!! `);
  sockeetPool[id] = socket;
  socket.on('data',(buffer)=> dispatchEvent(buffer));

  socket.on('error', (e) => { console.log('SOCKET ERR', e); });

  socket.on('end', (end) => {
    console.log('connection ended', end);
    delete sockeetPool[id];
  });

});

server.on('error', (e) => {
  console.log('SERVER ERROR', e);
});


function dispatchEvent(buffer){
  let obj = JSON.parse(buffer.toString().trim());
  console.log('EVENT ',obj);
  broadcast(obj);
}




function broadcast(obj){
  let strObj = JSON.stringify(obj);
  for(let socket in sockeetPool){
    sockeetPool[socket].write(strObj);
  }
}

