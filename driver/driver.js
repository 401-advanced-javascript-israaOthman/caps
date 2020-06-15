'use strict';

const net = require('net'); 

const client = net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3030;

client.connect(PORT,HOST,()=>{
  console.log('Driver got connected');
});

client.on('data',function(data){
  let obj = JSON.parse(data);
  if (obj.event == 'pickup'){
    setTimeout(()=>{
      console.log(`DRIVER: picked up ${obj.payload.orderId}`);
      let message = JSON.stringify({event:'in-transit', payload:obj.payload});
      client.write(message);
      setTimeout(()=>{
        let msg = JSON.stringify({event:'delivered', payload:obj.payload});
        client.write(msg);
      }, 3000);
    }, 1000);
  }
});


