"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.likeImage = exports.uploadImage = exports.getImages = void 0;
const env_1 = __importDefault(require("../../config/env"));
const mongo_1 = require("../../DataAccess/mongo");
const mongodb_1 = require("mongodb"); // Ensure this import is at the top of your file
const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const blobServiceClient = BlobServiceClient.fromConnectionString(env_1.default.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(env_1.default.AZURE_STORAGE_CONTAINER_NAME);
async function getImages() {
    var db = await (0, mongo_1.getDb)();
    const collection = db === null || db === void 0 ? void 0 : db.collection('images');
    return await (collection === null || collection === void 0 ? void 0 : collection.find({}).toArray());
}
exports.getImages = getImages;
async function uploadImage(image) {
    const blobName = uuidv1() + '.jpg';
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(image.filepath);
    addImageToDb({ url: blockBlobClient.url, title: image.title });
    return blobName;
}
exports.uploadImage = uploadImage;
async function addImageToDb(imageData) {
    const imageDTO = {
        url: imageData.url,
        likes: 0,
        title: imageData.title
    };
    var db = await (0, mongo_1.getDb)();
    const collection = db === null || db === void 0 ? void 0 : db.collection('images');
    await (collection === null || collection === void 0 ? void 0 : collection.insertOne(imageDTO));
    return;
}
async function likeImage(imageId) {
    var db = await (0, mongo_1.getDb)();
    const collection = db === null || db === void 0 ? void 0 : db.collection('images');
    const objectId = new mongodb_1.ObjectId(imageId);
    const image = await (collection === null || collection === void 0 ? void 0 : collection.findOne({ _id: objectId }));
    if (image) {
        await (collection === null || collection === void 0 ? void 0 : collection.updateOne({ _id: objectId }, { $set: { likes: image.likes + 1 } }));
    }
    return objectId;
}
exports.likeImage = likeImage;
async function deleteImage(imageId) {
    const blockBlobClient = containerClient.getBlockBlobClient(imageId);
    await blockBlobClient.delete();
    return;
}
exports.deleteImage = deleteImage;
