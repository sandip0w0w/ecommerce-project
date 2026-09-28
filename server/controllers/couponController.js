const Coupon = require("../models/Coupon")

const getAllCoupon = async (req, res) => {
    try{
        
        const coupons = await Coupon.find({});
        return res.json({success: true, coupons })

    }catch(error){
       return res.json({success: false, message: error.message})
    }

}

const addCoupon = async (req, res) => {

    const {
        code, discountValue, minOrderAmount,
        isActive,
        totalQuantity, startDate, expirationDate
    } = req.body;

    try {
        const couponData = {
            code,
            discountValue,
            minOrderAmount,
            isActive,
            totalQuantity,
            startDate,
            expirationDate
        }

        const newCoupon = new Coupon(couponData)
        await newCoupon.save();

        return res.json({success: true, message: 'Coupon added!'});

    }catch(error){
        return res.json({success: false, message: error.message})
    }

}

const updateCoupon = async (req, res) => {
    const {
        id,
        code, discountValue, minOrderAmount,
        isActive,
        totalQuantity, startDate, expirationDate
    } = req.body;

    try {
        const couponData = {
            code,
            isActive,
            discountValue,
            minOrderAmount,
            totalQuantity,
            startDate,
            expirationDate
        }

        await Coupon.findByIdAndUpdate(id, couponData, { new: true, runValidators: true})

        return res.json({success: true, message: 'Coupon updated!'});

    }catch(error){
        return res.json({success: false, message: error.message})
    }

}

const redeemCoupon = async (req, res) => {
    const { userId } = req.session
    if(!userId){
        return res.json({success: false, message: 'Login to reedem.'})
    }
    const { code, cartTotal } = req.body

    try{
        const coupon = await Coupon.findOne({code: code.toUpperCase()});
        if(!coupon) throw new Error('Invalid Coupon Code');
        if(!coupon.isValid) throw new Error('Coupon expired or fully depleted');
        if(cartTotal < coupon.minOrderAmount) {
            throw new Error('Invalid Coupon Code');
        }
        const hasUsed = coupon.usedBy.some((id) => id.toString() === userId.toString());
        if(hasUsed){
            throw new Error('Cannot reedem coupon.')
        }

        await Coupon.findOneAndUpdate(
            {
                _id:coupon._id,
                isActive: true,
                $expr: { $lt: ['$usedCount', '$totalQuantity']}
            },
            {
                $inc: {usedCount: 1},
                $push: {usedBy: userId}
            }
        )

        return res.json({success:true, message: "Coupon Reedemed", discountValue: coupon.discountValue});

    }catch(error){return res.json({success: false, message: error.message})}

}

module.exports = {
    getAllCoupon, addCoupon, updateCoupon, redeemCoupon
}