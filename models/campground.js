const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId, 
      ref: 'Review'
    }
  ]
})

//미들웨어 설정
CampgroundSchema.post('findOneAndDelete', async function(doc) {
  if(doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

// 캠프 모델 생성
const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground;