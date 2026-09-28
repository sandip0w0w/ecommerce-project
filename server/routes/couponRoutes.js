const express = require('express');
const router = require('express').Router();
const { protect, protectAdmin } = require('../middleware/adminAuth')
const { getAllCoupon, addCoupon, updateCoupon, redeemCoupon} = require('../controllers/couponController');

router.get("/", protect, protectAdmin, getAllCoupon);
router.post("/add", protect, protectAdmin, addCoupon);
router.post("/update", protect, protectAdmin, updateCoupon);
router.post("/redeem", protect, redeemCoupon)

module.exports = router