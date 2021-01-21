const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campground = require('../controllers/campground');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
	.route('/')
	.get(catchAsync(campground.index))
	.post(isLoggedIn, upload.array('image'), validateCampground,catchAsync(campground.create));

router.get('/new', isLoggedIn, campground.newForm);

router
	.route('/:id')
	.get(catchAsync(campground.show))
	.put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campground.update))
	.delete(isLoggedIn, isAuthor, catchAsync(campground.delete));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.edit));

module.exports = router;
