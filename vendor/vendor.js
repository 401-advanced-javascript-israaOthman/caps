'use strict';

require('dotenv').config();
const net = require('net'); 

const faker = require('faker');

const storeName = process.env.storeName;


const client = net.Socket();


const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3030;

client.connect(PORT,HOST,()=>{
  console.log('Vendor got connected');
});

client.on('data',function(data){
  let parsedMessage = JSON.parse(data);
  if (parsedMessage.event == 'delivered') {
    console.log(`VENDOR: Thank you for delivering ${parsedMessage.payload.orderId}`);
  }
});

let interval = setInterval(pickInfo, 5000);

function pickInfo() {
  let obj = {storeName: storeName,
    orderId:faker.random.uuid(), 
    customerName:faker.name.findName(),
    address:faker.address.streetAddress()};

  let message = JSON.stringify({event:'pickup', payload:obj});
  client.write(message);
}


client.on('end',()=>{
  clearInterval(interval);
  console.log('connection ended');
});
