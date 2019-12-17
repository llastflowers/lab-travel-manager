const mongoose = require('mongoose');
// const { getTrip } = require('../services/trips');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latLong: {
    type: String,
    required: true
  }
}, {
  id: false,
  toJSON: { virtuals: true }
});

schema.virtual('plans', {
  ref: 'Plan',
  localField: '_id',
  foreignField: 'tripId',
});

module.exports = mongoose.model('Trip', schema);
