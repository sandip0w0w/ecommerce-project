const { client } = require('../config/redis')

const VERSION_KEY = 'products:version';

const getProductVersion = async () => {
    return (await client.get(VERSION_KEY)) ?? '0';
}

const bumpProductVersion = async () => {
    return client.incr(VERSION_KEY);
}

const productCacheKey = async (page, limit, version) => {
    return `products:v${version}:page:${page}:limit:${limit}`;
}

module.exports = {
    getProductVersion,
    bumpProductVersion,
    productCacheKey
}