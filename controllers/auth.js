const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		isAuthenticated: false
	});		
};

exports.postLogin = (req, res, next) => {
	User.findById('5c2bc6ac0778a152cdc8fa14')
	.then(user => {
		req.session.isLoggedIn = true;
		req.session.user= user;
		req.session.save((err) => {
			console.log(err);
			res.redirect('/')
		});
	});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/')
	});
};