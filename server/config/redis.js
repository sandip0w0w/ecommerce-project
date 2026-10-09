const { Redis } = require('@upstash/redis');

const client = Redis.fromEnv();

const connectRedis = async () => {
    await client.ping();
    console.log("Redis connected successfully");    
}

module.exports = { connectRedis, client };