"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.likeImage = exports.uploadImage = exports.getLazyLoadingImages = exports.getImagesBySection = void 0;
const storage_1 = require("firebase/storage"); // Corrected import for getStorage
const firebase_1 = require("../../DataAccess/firebase");
const firebase_2 = require("../../DataAccess/firebase");
const app_1 = require("firebase/app");
const firebase_3 = require("../../DataAccess/firebase");
const analytics_1 = require("firebase/analytics");
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
    return await (0, firebase_1.getImagesByCollectionName)(section);
}
exports.getImagesBySection = getImagesBySection;
async function getLazyLoadingImages(lazyLoadingArgs) {
    return await (0, firebase_1.getLazyLoadingImagesFroDb)(lazyLoadingArgs);
}
exports.getLazyLoadingImages = getLazyLoadingImages;
async function uploadImage(image) {
    const dateTime = new Date().toISOString();
    var file = image.file;
    var title = image.title;
    var collection = image.collection;
    const storageRef = (0, storage_1.ref)(storage, `images/${title + "   " + dateTime}`);
    const metaData = {
        contentType: image.file.mimetype,
    };
    const snapshot = await (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metaData);
    const downloadUrl = await (0, storage_1.getDownloadURL)(snapshot.ref);
    addImageToDb({ url: downloadUrl, title: title, collection: collection });
    return image.file.originalname;
}
exports.uploadImage = uploadImage;
async function addImageToDb(imageData) {
    const imageDTO = {
        url: imageData.url,
        likes: 0,
        title: imageData.title
    };
    await (0, firebase_3.add)(imageDTO, imageData.collection);
    return;
}
async function likeImage(imageId) {
    await (0, firebase_2.likeImageById)(imageId);
}
exports.likeImage = likeImage;
async function deleteImage(imageId) {
    await (0, firebase_1.deleteImageById)(imageId);
    return;
}
exports.deleteImage = deleteImage;
