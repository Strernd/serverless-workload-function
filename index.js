const bcrypt = require('bcryptjs');

const hashWorkload = async (config) => {
    const start = + new Date();
    const plainText = config.plainText || 'benchmark';
    const rounds = config.rounds || 10;
    const hash = await bcrypt.hash(plainText, rounds);
    const end = + new Date();
    const time = end - start;
    return {
        start,
        end,
        time,
        plainText,
        rounds,
        hash,
        version: process.version
    }
}

const timeout = (min, max) => new Promise(resolve => {
    const duration = Math.round(Math.random() * (max - min) + min);
    setTimeout(() => resolve(duration), duration);
})

const apiWorkload = async (config) => {
    const start = + new Date();
    const min = config.min || 30;
    const max = config.max || 80;
    const apiResponseTime = await timeout(min, max);
    const end = + new Date();
    const time = end - start;
    return {
        start,
        end,
        time,
        min,
        max,
        apiResponseTime,
        version: process.version
    }
}

module.exports = async (type = "hash", config = {}) => {
    if (type === 'hash') return hashWorkload(config);
    else if (type === 'api') return apiWorkload(config);
    else return 'unknown type'
}
