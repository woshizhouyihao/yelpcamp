const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campground = require('../controllers/campground');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/')
    .get(catchAsync(campground.index))
    .post(upload.array('image'), (req, res)=> {

    });

router.get('/new', isLoggedIn, campground.newForm);

router
	.route('/:id')
	.get(catchAsync(campground.show))
	.put(isLoggedIn, isAuthor, validateCampground, catchAsync(campground.update))
	.delete(isLoggedIn, isAuthor, catchAsync(campground.delete));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.edit));

module.exports = router;
