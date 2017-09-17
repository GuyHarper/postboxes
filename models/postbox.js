const mongoose = require('mongoose');

const postboxSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  lastCollection: String,
  saturdayCollection: String
});

module.exports = mongoose.model('Postbox', postboxSchema);
