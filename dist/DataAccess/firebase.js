"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLazyLoadingImagesFromDb = exports.getImagesByCollectionName = exports.deleteImageById = exports.updateImageById = exports.likeImageById = exports.add = exports.firebaseConfig = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firestore_2 = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
exports.firebaseConfig = {
    apiKey: "AIzaSyBVnn0AZ8IWdmtzZupoTPxxrMu1_lhVJB8",
    authDomain: "dianashimongallery.firebaseapp.com",
    projectId: "dianashimongallery",
    storageBucket: "dianashimongallery.appspot.com",
    messagingSenderId: "393221943549",
    appId: "1:393221943549:web:a162cca3ef1bc695950e94",
    measurementId: "G-JQ5P7Q88S1"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(exports.firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
async function add(data, collectionName) {
    try {
        const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(db, collectionName), data);
        return `Document added with ID: ${docRef.id}`;
    }
    catch (e) {
        return "Error adding document: " + e;
    }
}
exports.add = add;
async function likeImageById(imageId) {
    try {
        const docRef = (0, firestore_2.doc)(db, 'gallery', imageId);
        await (0, firestore_2.setDoc)(docRef, { likes: (0, firestore_1.increment)(1) }, { merge: true });
    }
    catch (e) {
        return "Error updating document: " + e;
    }
}
exports.likeImageById = likeImageById;
async function updateImageById(imageId, data) {
    try {
        var collection = data.collection;
        const docRef = (0, firestore_2.doc)(db, collection, imageId);
        await (0, firestore_2.setDoc)(docRef, data, { merge: true });
        return `Document updated with ID: ${docRef.id}`;
    }
    catch (e) {
        return "Error updating document: " + e;
    }
}
exports.updateImageById = updateImageById;
async function deleteImageById(imageId, collection) {
    try {
        const docRef = (0, firestore_2.doc)(db, collection, imageId);
        await (0, firestore_1.deleteDoc)(docRef);
    }
    catch (e) {
        return "Error deleting document: " + e;
    }
}
exports.deleteImageById = deleteImageById;
async function getImagesByCollectionName(collectionName) {
    try {
        const querySnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(db, collectionName));
        const images = querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        return images;
    }
    catch (e) {
        return "Error getting documents: " + e;
    }
}
exports.getImagesByCollectionName = getImagesByCollectionName;
async function getLazyLoadingImagesFromDb(lastDoc, limitNumber) {
    let imagesQuery;
    let images = [];
    if (lastDoc) {
        lastDoc = new firestore_1.Timestamp(lastDoc.seconds, lastDoc.nanoseconds);
        imagesQuery = (0, firestore_1.query)((0, firestore_1.collection)(db, 'gallery'), (0, firestore_1.orderBy)('createDate'), (0, firestore_1.startAfter)(lastDoc), (0, firestore_1.limit)(limitNumber));
    }
    else {
        imagesQuery = (0, firestore_1.query)((0, firestore_1.collection)(db, 'gallery'), (0, firestore_1.orderBy)('createDate'), (0, firestore_1.limit)(limitNumber));
    }
    try {
        const querySnapshot = await (0, firestore_1.getDocs)(imagesQuery);
        if (querySnapshot.empty) {
            console.log('No more  to retrieve.');
            return { images, lastVisibleCreateDate: null };
        }
        else {
            images = querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        }
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
        const lastVisibleCreateDate = lastVisible === null || lastVisible === void 0 ? void 0 : lastVisible.data().createDate;
        return { images, lastVisibleCreateDate };
    }
    catch (e) {
        return { images, lastVisibleCreateDate: null };
        console.log("Error getting documents: " + e);
    }
}
exports.getLazyLoadingImagesFromDb = getLazyLoadingImagesFromDb;
