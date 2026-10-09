const { Redis } = require('@upstash/redis');

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;

if (!url || !token) {
    throw new Error(
        'Redis credentials missing: KV_REST_API_URL and KV_REST_API_TOKEN must be set'
    );
}

const client = new Redis({ url, token });

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