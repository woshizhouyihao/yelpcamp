const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const camp = new Campground({
			author: '6008c20cf5445e8e69225fb5',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			geometry: {
				type: 'Point',
				coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
			},
			images: [
				{
					url: 'https://res.cloudinary.com/zyhsz/image/upload/v1611262993/YelpCamp/qym4fxbarjqbdn4mu91n.jpg',
					filename: 'YelpCamp/qym4fxbarjqbdn4mu91n'
				},
				{
					url: 'https://res.cloudinary.com/zyhsz/image/upload/v1611262992/YelpCamp/gr94sbqxcs6trqzeism3.jpg',
					filename: 'YelpCamp/gr94sbqxcs6trqzeism3'
				}
			],
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora corporis explicabo tenetur, saepe id accusantium. Labore laborum ex debitis sed ea numquam! Laudantium eligendi consequuntur dolore. Fuga odit explicabo assumenda.', 
			price: Math.floor(Math.random() * 20) + 30
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
