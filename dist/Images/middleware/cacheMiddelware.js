"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheImage = exports.updateCacheWithNewData = exports.updateCacheWithUpdatedArrayData = exports.deleteFromCache = exports.cacheMiddlewareForLazyLoading = exports.cacheMiddleware = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const client = new ioredis_1.default("rediss://default:AYv4AAIjcDExMmZhZDJjY2RlNzA0YzEzOWM3NDUxMDQ2Y2NjZDYwOXAxMA@crucial-dassie-35832.upstash.io:6379");
const cacheMiddleware = async (req, res, next) => {
    const { imageName, lastDoc } = req.params;
    const objectToCheck = {
        imageName,
        lastDoc
    };
    try {
        const data = await client.get(JSON.stringify(objectToCheck));
        if (data !== null) {
            res.send(data);
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        next();
    }
};
exports.cacheMiddleware = cacheMiddleware;
const cacheMiddlewareForLazyLoading = async (cacheKey) => {
    try {
        const data = await client.get(cacheKey);
        if (data !== null) {
            return data;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log(err);
        return null;
    }
};
exports.cacheMiddlewareForLazyLoading = cacheMiddlewareForLazyLoading;
async function deleteFromCache(id) {
    const keys = await client.keys('images:*');
    keys.forEach(async (key) => {
        const cachedData = await client.get(key);
        if (cachedData) {
            const cachedResult = JSON.parse(cachedData);
            const index = cachedResult.images.findIndex((image) => image.id === id);
            if (index !== -1) {
                cachedResult.images.splice(index, 1);
                client.set(key, JSON.stringify(cachedResult));
            }
        }
    });
}
exports.deleteFromCache = deleteFromCache;
async function updateCacheWithUpdatedArrayData(updatedData) {
    const keys = await client.keys('images:*');
    keys.forEach(async (key) => {
        const cachedData = await client.get(key);
        if (cachedData) {
            const cachedResult = JSON.parse(cachedData);
            updatedData.forEach(newData => {
                const index = cachedResult.images.findIndex((image) => image.id === newData.id);
                if (index !== -1) {
                    cachedResult.images[index] = newData;
                }
            });
            client.set(key, JSON.stringify(cachedResult));
        }
    });
}
exports.updateCacheWithUpdatedArrayData = updateCacheWithUpdatedArrayData;
async function updateCacheWithNewData(newData) {
    const keys = await client.keys('images:*');
    await Promise.all(keys.map(async (key) => {
        const cachedData = await client.get(key);
        if (cachedData) {
            const cachedResult = JSON.parse(cachedData);
            const index = cachedResult.images.findIndex((image) => image.id === newData.id);
            if (index !== -1) {
                console.log(`Updating image ${newData.title} with old index ${cachedResult.images[index].index} to new index ${newData.index}`);
                cachedResult.images[index] = Object.assign(Object.assign({}, cachedResult.images[index]), { title: newData.title, Style: newData.Style, index: newData.index });
                await new Promise((resolve, reject) => {
                    client.set(key, JSON.stringify(cachedResult), (err, reply) => {
                        if (err) {
                            console.error('Error setting cache:', err);
                            reject(err);
                        }
                        else {
                            console.log('Cache set successfully:', reply);
                            resolve(reply);
                        }
                    });
                });
            }
        }
    }));
    console.log('All cache updates completed.');
}
exports.updateCacheWithNewData = updateCacheWithNewData;
const cacheImage = (cacheKey, data) => {
    try {
        client.set(cacheKey, JSON.stringify(data), 'EX', 3600);
    }
    catch (e) {
        console.log(e);
    }
};
exports.cacheImage = cacheImage;
