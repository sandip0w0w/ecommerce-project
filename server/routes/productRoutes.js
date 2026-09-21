const express = require('express')
const router = require('express').Router()
const { addProduct,
    listProduct,
    removeProduct,
    singleProduct } = require('../controllers/productController');
const upload = require('../middleware/multer');
const {protect, protectAdmin} = require('../middleware/adminAuth')

router.get("/",protect, listProduct);
router.post("/add",protect, protectAdmin , upload.fields([{name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1},
]), addProduct);

router.post("/remove",protect, protectAdmin, removeProduct);
router.get("/:id",protect, singleProduct);

module.exports = router