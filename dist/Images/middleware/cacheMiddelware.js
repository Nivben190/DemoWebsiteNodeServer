"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheImages = exports.cacheMiddleware = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const client = new ioredis_1.default("rediss://default:AYv4AAIjcDExMmZhZDJjY2RlNzA0YzEzOWM3NDUxMDQ2Y2NjZDYwOXAxMA@crucial-dassie-35832.upstash.io:6379");
const cacheMiddleware = async (req, res, next) => {
    const { imageName } = req.params;
    try {
        const data = client.get(imageName);
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
const cacheImage = (imageName, imageUrl) => {
    client.set(imageName, imageUrl);
};
const cacheImages = (images) => {
    images.forEach((image) => {
        console.log("Caching image: " + image.title);
        cacheImage(image.title, image.url);
    });
};
exports.cacheImages = cacheImages;
