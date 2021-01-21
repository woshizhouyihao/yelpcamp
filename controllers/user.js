const User = require('../models/user');

module.exports.register = (req, res) => {
	res.render('user/register');
};
module.exports.login = (req, res) => {
	res.render('user/login');
};
module.exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Successfully logged out!');
	res.redirect('/campgrounds');
};
module.exports.createAccount = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
		}); // automatically log in right after register
		req.flash('success', 'Welcome to Yelp Camp!');
		res.redirect('/campgrounds');
	} catch (e) {
		req.flash('error', 'Username or password has already been used!');
		res.redirect('/register');
	}
};
module.exports.signIn = (req, res) => {
	req.flash('success', 'Successfully logged in!');
	const redirectUrl = req.session.returnTo || '/campgrounds';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};
