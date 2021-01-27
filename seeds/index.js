const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "600ee36203ea6f22ed119097",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/ddgzong6n/image/upload/v1611786102/YelpCamp/ujfvnhfxeenohrmxywkj.jpg",
          filename: "YelpCamp/ujfvnhfxeenohrmxywkj",
        },
        {
          url:
            "https://res.cloudinary.com/ddgzong6n/image/upload/v1611786098/YelpCamp/ucl0vzwz86yixjqpfxws.jpg",
          filename: "YelpCamp/ucl0vzwz86yixjqpfxws",
        },
      ],
      price,
    });
    await camp.save();
  }
};

seedDB();

seedDB().then(() => {
  mongoose.connection.close();
});
