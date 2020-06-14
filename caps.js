'use strict';

require('dotenv').config();

const events = require('./events');



events.on('pickup', paylaod => globalLog('pickup',paylaod));
events.on('in-transit',paylaod => globalLog('in-transit',paylaod));
events.on('delivered',paylaod => globalLog('delivered',paylaod));


function globalLog(event,paylaod){
  let time = new Date();
  let output = {event: event ,time: time, payload:paylaod};
  console.log(`EVENT ${output}`);
}

require('./vendor'); //emit pickup
require('./driver'); // on pickup2 + emit in-transit + emit delivered


