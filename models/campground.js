const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 캠프의 기본 스키마
const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String
})

// 캠프 모델 생성
const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground;