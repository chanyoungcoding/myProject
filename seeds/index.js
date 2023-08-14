const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/chan-camp")
  .then(() => {
    console.log("MongoDB Connection!!");
  })
  .catch((e) => {
    console.log(e);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '64d9d8706ee0f3670290766c',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dnjjlp2uy/image/upload/v1691998363/ChanCamp/qstdv9mzvcbn7abdyxo4.jpg',
          filename: 'ChanCamp/qstdv9mzvcbn7abdyxo4',
        },
        {
          url: 'https://res.cloudinary.com/dnjjlp2uy/image/upload/v1691998363/ChanCamp/qstdv9mzvcbn7abdyxo4.jpg',
          filename: 'ChanCamp/qstdv9mzvcbn7abdyxo4',
        }
      ],
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque non dolorum soluta alias doloribus. Inventore minus, quasi quia debitis aliquid velit omnis molestias temporibus a tempora architecto maiores blanditiis dicta?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      }

    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
