const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
	'/login',
	[
		body('email', 'Please enter a valid email address')
			.isEmail(),
		body('password', 'Password must contain at least five characters.')
			.isLength({min: 5})
			.isAlphanumeric()
	],
	authController.postLogin
);

router.post(
	'/signup',
	[
		check('email')
			.isEmail()
			.withMessage('Please enter a valid email')
			.custom((value, {req}) => {
				// if (value === 'test@test.com') {
				// 	throw new Error('This email address shall not pass.')
				// };
				// return true;
				return User.findOne({email: value})
				.then(userDoc => {
					if (userDoc) {
						return Promise.reject('Email address already exists.')
					};
				});
			}),
		body(
			'password', 'Please enter password with only numbers and text.')
			.isLength ({ min: 5 })
			.isAlphanumeric(),
		body('confirmPassword').custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords have to match.')
			};
			return true;
		})
	],
	authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;