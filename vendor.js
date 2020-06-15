'use strict';

require('dotenv').config();
const events = require('./events');
const faker = require('faker');

const storeName = process.env.storeName;

events.on('delivered',consolThanks);

function consolThanks(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
}


setInterval(pickInfo, 5000);

function pickInfo() {
  let obj = {storeName: storeName,
    orderId:faker.random.uuid(), 
    customerName:faker.name.findName(),
    address:faker.address.streetAddress()};
  events.emit('pickup',obj);
}