const { Redis } = require('@upstash/redis');

const client = Redis.fromEnv();

const connectRedis = async () => {
    try {
        await client.ping();
        console.log('Redis connected successfully');
    } catch (err) {
        console.error('Redis connection failed:', err.message);
        throw err;
    }
};

module.exports = { connectRedis, client };