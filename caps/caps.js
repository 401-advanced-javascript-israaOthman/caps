'use strict';

require('dotenv').config();


const net = require('net');
const PORT = process.env.PORT || 3030;
const server = net.createServer();

server.listen(PORT,()=> console.log(`listning to port ${PORT}`));


let sockeetPool ={};

server.on('connection',(socket)=>{
  
  const id = `Socket-${Math.random()}`; 
  console.log(`client with ID : ${id} is connected!!! `);
  sockeetPool[id] = socket;
  socket.on('data',(buffer)=> dispatchEvent(buffer));

});


function dispatchEvent(buffer){
  let obj = JSON.parse(buffer.toString().trim());
  globalLog(obj.event,obj.paylaod);
  broadcast(obj);
}




function broadcast(obj){
  let strObj = JSON.stringify(obj);
  for(let socket in sockeetPool){
    sockeetPool[socket].write(strObj);
  }
}


function globalLog(event,paylaod){
  let time = new Date();
  let output = {event: event ,time: time, payload:paylaod};
  console.log(`EVENT ${output}`);
}
