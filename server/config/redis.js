const { Redis } = require('@upstash/redis');

const client = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
})

const connectRedis = async () => {
    await client.ping();
    console.log("Redis connected successfully");    
}

module.exports = { connectRedis, client };