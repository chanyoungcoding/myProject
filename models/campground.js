const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

// 캠프의 기본 스키마

const ImageSchema = new Schema({
  url: String,
  filename: String
})

const opts = { toJSON: {virtuals: true}};

const CampgroundSchema = new Schema({
  title: {
    type:String,
    required: [true, '캠프이름이 필요합니다.']
  },
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
      enum:['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  city: String,
  phoneNumber: String,
  category: String,
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
}, opts)

CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
  return `
  <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <p>${this.description.substring(0,30)}...</p>
  `
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