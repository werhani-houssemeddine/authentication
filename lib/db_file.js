const {createClient} = require('redis');

function redisConnect(){
    
    const redisClient = createClient({
        legacyMode: true
    });

    redisClient.on('error', (err) => console.error('Redis client error :' + err));
    return redisClient;
}

module.exports = redisConnect();