'use strict';

const net = require('net'); 

const client = net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3030;
let timeout1;
let timeout2;

client.connect(PORT,HOST,()=>{
  console.log('Driver got connected');
});

client.on('data',function(data){
  let obj = JSON.parse(data);
  if (obj.event == 'pickup'){
    timeout1= setTimeout(()=>{
      console.log(`DRIVER: picked up ${obj.payload.orderId}`);
      let message = JSON.stringify({event:'in-transit', payload:obj.payload});
      client.write(message);
    }, 1000);

    timeout2= setTimeout(()=>{
      let msg = JSON.stringify({event:'delivered', payload:obj.payload});
      client.write(msg);
    }, 3000);
  }
});

client.on('end',()=>{
  clearTimeout(timeout1);
  clearTimeout(timeout2);
  console.log('connection ended');
});



