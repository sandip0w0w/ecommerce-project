const { createClient } = require("redis");

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

client.on("error", function(err){
    throw err;
})

const connectRedis = async () => {
    try {
       await client.connect();
    } catch (err) {
        console.error('Redis connection failed:', err.message);
        throw err;
    }
};

module.exports = { connectRedis, client };