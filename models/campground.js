const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 캠프의 기본 스키마
const CampgroundSchema = new Schema({
  title: {
    type:String,
    required: [true, '캠프이름이 필요합니다.']
  },
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId, ref: 'Review'
    }
  ]
})

// 캠프 모델 생성
const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground;