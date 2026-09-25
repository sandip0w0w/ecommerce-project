const Order = require("../models/Order");
const User = require("../models/User");
const Stripe = require('stripe');
const crypto = require('crypto');
const currencyConvert = require('../utils/converter');

const currency = 'usd';
const deliveryCharge = 10;

// gateway intialization
const stripe = new Stripe(process.env.STRIPE_SEC_KEY);

// uuid generation
const generateRandomString = () =>{
    const strings = "jdkfjakfjdkjj34kj23i42i4u23i4u23i423u4i";
    let code = "";
    let length = 25;
    for (let i = 0; i < length; i++) {
        code += strings[Math.floor(Math.random() * strings.length)];
  }
  return code;
}

// signature generation
const generateSignature = (message, secret) => {
    return crypto
        .createHmac('sha256', secret)
        .update(message)              
        .digest('base64');            
};


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

const placeOrderESEWA = async (req, res) => {
  try {
    const { userId } = req.session;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    const transaction_uuid = generateRandomString();
    const product_code = "EPAYTEST";
    const secretKey = '8gBm/:&EnhH.1/q';

    const tax_amount = 0;
    const product_service_charge = 0;

    const [convertedAmount, product_delivery_charge] = await Promise.all([
        currencyConvert(amount),
        currencyConvert(deliveryCharge)
    ]);

    const total_amount = (convertedAmount + product_service_charge + product_delivery_charge + tax_amount).toFixed(2);
    
    const signature = generateSignature(
      `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
      secretKey
    );

    const orderData = {
      userId,
      address,
      items,
      amount, 
      paymentMethod: "ESEWA",
      payment: false,
      date: Date.now()
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    return res.json({
      success: true,
      esewaData: {
        amount: convertedAmount,
        tax_amount,
        total_amount,
        transaction_uuid,
        product_code,
        product_service_charge,
        product_delivery_charge,
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        failure_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature
      },
      esewaUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
    });

  } catch (error) {
    console.error("eSewa Order Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// verify online payment
const verifyPayment = async(req, res) => {
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
    verifyPayment,
    placeOrderESEWA
}