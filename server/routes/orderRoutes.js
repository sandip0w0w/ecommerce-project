const express = require('express');
const router = require('express').Router();
const {
    placeOrder, placeOrderStripe,
    allOrders, userOrders, updateStatus, verifyStripe
} = require('../controllers/orderController');
const { protect, protectAdmin } = require('../middleware/adminAuth')

// admin routes
router.get('/list', protect, protectAdmin, allOrders );
router.post('/status', protect, protectAdmin, updateStatus);

// payment features
router.post('/cod', protect, placeOrder);
router.post('/stripe', protect, placeOrderStripe);

// user features
router.get('/items', protect, userOrders);

// verify payments
router.post('/verifyStripe', protect, verifyStripe)

module.exports = router;