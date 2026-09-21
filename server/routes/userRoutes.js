const express = require('express');
const {loginUser, registerUser, adminLogin, session } = require('../controllers/userController')
const router = require('express').Router()
const {protect, protectAdmin} = require('../middleware/adminAuth')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin', adminLogin);
router.get("/auth/session",protect, session);

module.exports = router