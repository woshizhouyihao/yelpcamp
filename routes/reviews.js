const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const review = require('../controllers/review');

router.post('/', validateReview, isLoggedIn, catchAsync(review.create));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.delete));

module.exports = router;
