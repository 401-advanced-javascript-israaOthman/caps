'use strict';

const events = require('./events');
 

events.on('pickup',driver);


function driver (payload){
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload);
    setTimeout(()=>{
      console.log(`delivered up ${payload.orderId}`);
      events.emit('delivered', payload);
    }, 3000);
  }, 1000);
}

