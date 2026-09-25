const Order = require("../models/Order");
const User = require("../models/User");
const Stripe = require('stripe');

const currency = 'usd';
const deliveryCharge = 10;

// gateway intialization
const stripe = new Stripe(process.env.STRIPE_SEC_KEY);
// placing order using COD Method
const placeOrder = async(req, res) => {

    try{
        const { userId } = req.session;
        const {items, amount, address } = req.body;
        const orderData = {
            userId,
            address,
            items,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId, {cartData: {}});
        
        res.json({success: true, message: "Order Placed"})

    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }

}

// placing order using Stripe Method
const placeOrderStripe = async(req, res) => {
    try{
        const { userId } = req.session;
        const {items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            address,
            items,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount : item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment', 
        })  

        res.json({success: true, session_url: session.url});


    }catch(error){
        res.json({success: false, message: error.message});
    }
    
}

// verify stripe payment
const verifyStripe = async(req, res) => {
    const { userId }  = req.session;
    const { orderId, success } = req.body;
    try{
        if(success === 'true'){
            await Order.findByIdAndUpdate(orderId, {payment: true});
            await User.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true});
        } else {
            await Order.findByIdAndDelete(orderId);
            res.json({success: false});
        }
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message})

    }
}

// ALl Orders data for Admin Panel
const allOrders = async(req, res) => {
    try{
        const orders = await Order.find({});
        res.json({success: true, orders});
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }

}

// ALl Orders data for User Panel
const userOrders = async(req, res) => {
    const { userId } = req.session;
    try{
        const order = await Order.find({userId});
        return res.json({success: true, orders: order});
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// update order status
const updateStatus = async(req, res) => {
    try{
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        res.json({success: true, message : "Order status updated!"});
    }catch(error){
        console.log(error.message);
    }

}

module.exports = {
    placeOrder, placeOrderStripe,
    allOrders, userOrders, updateStatus,
    verifyStripe
}