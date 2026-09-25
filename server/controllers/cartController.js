const User = require("../models/User");

const addToCart = async(req, res) => {
    try{
        const { userId } = req.session;
        const {itemId, size } = req.body;
        const userData = await User.findById(userId);
        let cartData = await userData.cartData;
        
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            } 
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await User.findByIdAndUpdate(userId, {cartData});

        res.json({ success: true, message: "Added to Cart"})

    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message});
    }

}

const updateCart = async(req, res) => {

    try{
        const { userId } = req.session;
        const { itemId, size, quantity } = req.body;

        const userData =  await User.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;
        await User.findByIdAndUpdate(userId, {cartData});
        res.json({ success: true, message: "Cart Updated"});

    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message});
    }

}

const getUserCart = async(req, res) => {
    try{
        const { userId } = req.session;
        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        res.json({success: true, cartData });
    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message});
    }
}

module.exports = {
    addToCart,
    updateCart,
    getUserCart
}