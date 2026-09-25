const express = require('express');
const router = require('express').Router();
const { addToCart, updateCart, getUserCart } = require('../controllers/cartController');
const { protect } = require('../middleware/adminAuth');

router.post("/add",protect, addToCart);
router.post('/get', protect, getUserCart);
router.post('/update', protect, updateCart);


module.exports = router;