'use strict';

require('dotenv').config();

const events = require('./events');

require('./vendor'); //emit pickup

require('./driver'); // on pickup2 + emit in-transit + emit delivered


events.on('pickup', paylaod => global('pickup',paylaod));
events.on('in-transit',paylaod => global('in-transit',paylaod));
 
// DRIVER: delivered up e3669048-7313-427b-b6cc-74010ca1f8f0
// VENDOR: Thank you for delivering e3669048-7313-427b-b6cc-74010ca1f8f0

events.on('delivered',paylaod => global('delivered',paylaod));


function global(event,paylaod){
  let time = new Date();
  let output = {event: event ,time: time, payload:paylaod};
  console.log(`EVENT ${output}`);
}



