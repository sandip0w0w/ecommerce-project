const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ //6:16
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },

}, { minimize: false })

const User = mongoose.model('User', userSchema);
module.exports = User