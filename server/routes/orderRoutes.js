const express = require('express');
const router = require('express').Router();
const {
    placeOrder, placeOrderStripe,
    allOrders, userOrders, updateStatus, verifyPayment,
    placeOrderESEWA
} = require('../controllers/orderController');
const { protect, protectAdmin } = require('../middleware/adminAuth')

// admin routes
router.get('/list', protect, protectAdmin, allOrders );
router.post('/status', protect, protectAdmin, updateStatus);

// payment features
router.post('/cod', protect, placeOrder);
router.post('/stripe', protect, placeOrderStripe);
router.post('/esewa', protect,placeOrderESEWA)

// user features
router.get('/items', protect, userOrders);

// verify payments
router.post('/verifyPayment', protect, verifyPayment)

module.exports = router;