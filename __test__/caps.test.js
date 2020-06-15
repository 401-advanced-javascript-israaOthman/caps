'use strict';

require('../caps');
const events = require('../events');

let spy = jest.spyOn(console, 'log').mockImplementation();

let testObj = {
  storeName: 'rose',
  customerName: 'israa',
  orderId: '1234',
  address: 'amman',
};

describe('events test', () => {

  it(' delivered', () => {
    events.emit('delivered', testObj);
    expect(spy).toHaveBeenCalled();
  });
    
  it(' pickup', () => {
    events.emit('pickup', testObj);
    expect(spy).toHaveBeenCalled();
  });
    
  it(' in-transit', () => {
    events.emit('in-transit', testObj);
    expect(spy).toHaveBeenCalled();
  });
});