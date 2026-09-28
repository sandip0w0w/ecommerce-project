const mongoose = require('mongoose')

const couponSchema = new  mongoose.Schema({
   code : {
    type: String,
    required : true,
    unique: true,
    trim: true,
    uppercase: true
   },
   discountValue: {
    type: Number,
    required: true,
    min: 0
   },
   minOrderAmount: {
    type: Number,
    default: 0,
   },
   totalQuantity: {
    type: Number,
    required: true,
    min: 0
   },
   usedCount: {
    type: Number,
    default: 0
   },
   usedBy: {
    type: Array,
    default: [],
   },
   isActive: {
    type: Boolean,
    default: true,
   },
   startDate: {
    type: Date,
    default: Date.now,
   },
   expirationDate: {
    type: Date,
    required: true,
   }

},
{timestamps: true, minimize : false}
);

couponSchema.virtual('isValid').get(function (){
    const now = new Date();
    const hasQuantity = this.usedCount < this.totalQuantity;
    const isNotExpired = now >= this.startDate && now <= this.expirationDate;
    return this.isActive && hasQuantity && isNotExpired
});


const Coupon = mongoose.model('Coupons', couponSchema)
module.exports = Coupon