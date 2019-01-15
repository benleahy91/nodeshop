const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth')

const router = express.Router();

// /admin/add-product => GET
router.get(
	'/add-product',
	[
		body('title')
			.isAlphanumeric()
			.isLength({ min: 3 })
			.trim(),
		body('imageUrl')
			.isURL(),
		body('price')
			.isFloat(),
		body('description')
			.isLength({ min: 5, max: 400 })
			.trim()
	],
	isAuth,
	adminController.getAddProduct
);

// /admin/products => GET
router.get('/products',isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:prodId', isAuth, adminController.getEditProduct);

router.post(
	'/edit-product',
	[
		body('title')
			.isString()
			.isLength({ min: 3 })
			.trim(),
		body('imageUrl')
			.isURL(),
		body('price')
			.isFloat(),
		body('description')
			.isLength({ min: 5, max: 400 })
			.trim()
	],
	isAuth,
	adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
