const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  day: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Plan', schema);
