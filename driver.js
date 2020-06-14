'use strict';

const events = require('./events');
require('./caps');
require('./vendor');
 

events.on('pickup',driver);

setTimeout(driver, 1000);

function driver (payload){
  console.log(`DRIVER: picked up ${payload.orderId}`);
  events.emit('in-transit', payload);
}

setTimeout(dd, 3000);

function dd (payload){
  console.log(`delivered up ${payload.orderId}`);
  events.emit('delivered', payload);
}
