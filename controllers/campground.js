const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', { campgrounds });
};

module.exports.newForm = (req, res) => {
	res.render('campgrounds/new');
};

module.exports.show = async (req, res) => {
	const campground = await Campground.findById(req.params.id)
		.populate({ path: 'reviews', populate: { path: 'author' } })
		.populate('author');
	if (!campground) {
		req.flash('error', 'Cannot find the campground');
		res.redirect('/campgrounds');
	}
	req.session.returnTo = req.originalUrl;
	res.render('campgrounds/show', { campground });
};

module.exports.edit = async (req, res) => {
	const { id } = req.params;
	const campground = await Campground.findById(id);
	if (!campground) {
		req.flash('error', 'Cannot find the campground');
		res.redirect('/campgrounds');
	}
	res.render('campgrounds/edit', { campground });
};

module.exports.create = async (req, res, next) => {
	// if (!req.body.campground) throw new ExpressError('invalid input', 400);
	const campground = new Campground(req.body.campground);
	campground.author = req.user._id;
	await campground.save();
	req.flash('success', 'Successfully made a new campground!');
	res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.update = async (req, res) => {
	const { id } = req.params;
	await Campground.findByIdAndUpdate(id, { ...req.body.campground });
	req.flash('success', 'Successfully updated a campground!');
	res.redirect(`/campgrounds/${id}`);
};

module.exports.delete = async (req, res) => {
	await Campground.findByIdAndDelete(req.params.id);
	req.flash('success', 'Successfully deleted');
	res.redirect('/campgrounds');
};
