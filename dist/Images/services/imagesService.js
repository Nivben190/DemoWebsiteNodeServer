"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.likeImage = exports.saveImagesLayout = exports.uploadImage = exports.updateImage = exports.getLazyLoadingImages = exports.getImagesBySection = void 0;
const storage_1 = require("firebase/storage"); // Corrected import for getStorage
const firebase_1 = require("../../DataAccess/firebase");
const firebase_2 = require("../../DataAccess/firebase");
const app_1 = require("firebase/app");
const firebase_3 = require("../../DataAccess/firebase");
const analytics_1 = require("firebase/analytics");
const firebase_4 = require("../../DataAccess/firebase");
const fireBase = (0, app_1.initializeApp)(firebase_1.firebaseConfig); // Corrected initialization of firebase
(0, analytics_1.isSupported)().then((supported) => {
    if (supported) {
        const analytics = (0, analytics_1.getAnalytics)(fireBase);
        console.log("Firebase Analytics initialized.");
    }
    else {
        console.log("Firebase Analytics is not supported in this environment.");
    }
});
const storage = (0, storage_1.getStorage)();
async function getImagesBySection(section) {
    return await (0, firebase_1.getDataByCollectionName)(section);
}
exports.getImagesBySection = getImagesBySection;
async function getLazyLoadingImages(lazyLoadingArgs) {
    return await (0, firebase_1.getLazyLoadingImagesFromDb)(lazyLoadingArgs.lastDoc, lazyLoadingArgs.limitNumber);
}
exports.getLazyLoadingImages = getLazyLoadingImages;
async function updateImage(data) {
    var file = data.file;
    var title = data.title;
    var collection = data.collection;
    var imageId = data.imageId;
    var style = data.style;
    try {
        if (file) {
            (0, firebase_1.deleteDocById)(imageId, collection);
            var { url, title, collection } = await uploadToStorage(data);
            await (0, firebase_4.updateDocById)(imageId, { url: url, title: title, collection: collection, Style: style });
            // updateCacheWithNewData({url: url, title: title, collection: collection,Style : style});
            return { url, title, collection };
        }
        else {
            await (0, firebase_4.updateDocById)(imageId, { title: title, collection: collection, Style: style });
            return { title, collection };
        }
        return;
    }
    catch (e) {
        return "Error updating document: " + e;
    }
}
exports.updateImage = updateImage;
async function uploadImage(image) {
    var { url, title, collection } = await uploadToStorage(image);
    addImageToDb({ url: url, title: title, collection: collection, Style: image.style });
    return {
        url,
        title,
        collection,
        createDate: new Date().toISOString()
    };
}
exports.uploadImage = uploadImage;
async function uploadToStorage(image) {
    const dateTime = new Date().toISOString();
    var file = image.file;
    var title = image.title;
    var collection = image.collection;
    const storageRef = (0, storage_1.ref)(storage, `images/${title + "   " + dateTime}`);
    const metaData = {
        contentType: image.file.mimetype,
    };
    const snapshot = await (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metaData);
    const url = await (0, storage_1.getDownloadURL)(snapshot.ref);
    return { url, title, collection };
}
async function addImageToDb(imageData) {
    const index = await (0, firebase_1.getDataByCollectionName)(imageData.collection).then((data) => data.length);
    const imageDTO = {
        url: imageData.url,
        likes: 0,
        title: imageData.title,
        Style: imageData.Style,
        index: index,
        createDate: new Date().toISOString()
    };
    await (0, firebase_3.add)(imageDTO, imageData.collection);
    return;
}
async function saveImagesLayout(images) {
    images.forEach(async (image) => {
        await (0, firebase_4.updateDocById)(image.id, image);
    });
}
exports.saveImagesLayout = saveImagesLayout;
async function likeImage(imageId) {
    await (0, firebase_2.likeImageById)(imageId);
}
exports.likeImage = likeImage;
async function deleteImage(imageId, collection) {
    await (0, firebase_1.deleteDocById)(imageId, collection);
    // deleteFromCache(imageId);
    return;
}
exports.deleteImage = deleteImage;
