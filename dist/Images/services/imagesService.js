"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = exports.getImages = void 0;
const env_1 = __importDefault(require("../../config/env"));
const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const blobServiceClient = BlobServiceClient.fromConnectionString(env_1.default.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(env_1.default.AZURE_STORAGE_CONTAINER_NAME);
async function getImages() {
    var _a, e_1, _b, _c;
    const images = [];
    try {
        for (var _d = true, _e = __asyncValues(containerClient.listBlobsFlat()), _f; _f = await _e.next(), _a = _f.done, !_a; _d = true) {
            _c = _f.value;
            _d = false;
            const blob = _c;
            const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
            const image = {
                name: blob.name,
                url: `${tempBlockBlobClient.url}`
            };
            images.push(image);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return images;
}
exports.getImages = getImages;
async function uploadImage(image) {
    const blobName = uuidv1() + '.jpg';
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(image.filepath);
    return blobName;
}
exports.uploadImage = uploadImage;
async function deleteImage(imageId) {
    const blockBlobClient = containerClient.getBlockBlobClient(imageId);
    await blockBlobClient.delete();
    return;
}
exports.deleteImage = deleteImage;
