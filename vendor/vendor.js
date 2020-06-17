'use strict';

require('dotenv').config();

const faker = require('faker');


const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');
const storeName = process.env.storeName || 'Rose';

socket.emit('join',storeName);

socket.on('deliverd', payload=>{
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
})

 setInterval(pickInfo, 5000);

function pickInfo() {
  let delivery = {storeName: storeName,
    orderId:faker.random.uuid(), 
    customerName:faker.name.findName(),
    address:faker.address.streetAddress()};
    socket.emit('pickup',delivery);
}
