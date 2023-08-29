const mongoose = require("mongoose");
const cities = require("./cities");
const koreacamp = require('./전국휴양림표준데이터.json');
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/chan-camp")
  .then(() => {
    console.log("MongoDB Connection!!");
  })
  .catch((e) => {
    console.log(e);
  });


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {

    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      author: '64d9d8706ee0f3670290766c',
      location: `${koreacamp.records[i].소재지도로명주소}`,
      title: `${koreacamp.records[i].휴양림명}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dnjjlp2uy/image/upload/v1693008846/ChanCamp/nrnnujuzezbfb92qukz2.jpg',
          filename: 'ChanCamp/qstdv9mzvcbn7abdyxo4',
        },
        {
          url: 'https://res.cloudinary.com/dnjjlp2uy/image/upload/v1691998363/ChanCamp/qstdv9mzvcbn7abdyxo4.jpg',
          filename: 'ChanCamp/qstdv9mzvcbn7abdyxo4',
        }
      ],
      description: `${koreacamp.records[i].주요시설명}`,
      price,
      city: `${koreacamp.records[i].시도명}`,
      phoneNumber: '전화번호없음',
      category: '캠핑장',
      geometry: {
        type: "Point",
        coordinates: [
          koreacamp.records[i].경도,
          koreacamp.records[i].위도
        ]
      },
      wifi:'있음',
      bed:'2',
      pet:'가능',
      electricity:'있음',
      sportsFacility: '헬스장'
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
