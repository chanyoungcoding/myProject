const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facilitySchema = new Schema({
  wifi: Number,
  bed: Number,
  pet: Number,
  electricity: Number,
  exercise: Number
})

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;