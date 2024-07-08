
import { getDb } from '../../DataAccess/mongo';
import { getStorage,ref,getDownloadURL,uploadBytesResumable } from "firebase/storage"; // Corrected import for getStorage
import { deleteImageById, firebaseConfig, getImagesByCollectionName, getLazyLoadingImagesFroDb } from "../../DataAccess/firebase";
import { likeImageById } from '../../DataAccess/firebase';
import { initializeApp } from "firebase/app";
import { add } from '../../DataAccess/firebase';
import { getAnalytics, isSupported } from "firebase/analytics";
const fireBase =initializeApp(firebaseConfig); // Corrected initialization of firebase
isSupported().then((supported) => {
    if (supported) {
      const analytics = getAnalytics(fireBase);
      console.log("Firebase Analytics initialized.");
    } else {
      console.log("Firebase Analytics is not supported in this environment.");
    }
  });
const storage = getStorage(); 


export async function getImagesBySection(section: string): Promise<any> {
    return await getImagesByCollectionName(section);
}

export async function getLazyLoadingImages(lazyLoadingArgs: any): Promise<any> {
    return await getLazyLoadingImagesFroDb(lazyLoadingArgs);
}


export async function uploadImage(image: any) {
    const dateTime = new Date().toISOString();
    var file = image.file;
    var title = image.title;
    var collection = image.collection;
    const storageRef = ref(storage, `images/${title+"   "+ dateTime}`);
    const metaData = {
        contentType: image.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metaData);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    addImageToDb({url: downloadUrl, title: title, collection: collection});
    return image.file.originalname;
}
 async function addImageToDb(imageData: any) {
     const imageDTO ={
            url: imageData.url,
            likes: 0,
            title: imageData.title
     }
    await add(imageDTO, imageData.collection);
    return;
}

export async function likeImage(imageId: string): Promise<any> {
    await likeImageById(imageId);
}

export async function deleteImage(imageId: string): Promise<any> {
    await deleteImageById(imageId);
    return;
}
