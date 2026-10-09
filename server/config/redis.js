const { createClient } = require('redis');

const client = createClient({
    url: process.env.REDIS_URI ||'redis://localhost:6379'
})

client.on('error', (err) => console.log('Redis Client Error:', err.message));
client.on('connect', () => console.log('Redis connected successfully'));

const connectRedis = async () => {
    try{
        if(!client.isOpen){
        await client.connect();
        }
    }catch(error){
        console.log('Failed to connect to Redis:', error.message);
    }
}

module.exports = { connectRedis, client };