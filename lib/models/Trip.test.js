const mongoose = require('mongoose');
const Trip = require('./Trip');

describe('Trip model', () => {
  it('has a required name', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has lat and long fields', () => {
    const trip = new Trip({
      name: 'Mordor',
      latLong: '33.17638, -96.7886'
    });

    expect(trip.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Mordor',
      latLong: '33.17638, -96.7886'
    });
  });
});
