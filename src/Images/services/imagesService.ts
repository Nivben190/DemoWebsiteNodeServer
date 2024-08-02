
import { getStorage,ref,getDownloadURL,uploadBytesResumable } from "firebase/storage"; // Corrected import for getStorage
import { deleteDocById, firebaseConfig, getDataByCollectionName, getLazyLoadingImagesFromDb } from "../../DataAccess/firebase";
import { likeImageById } from '../../DataAccess/firebase';
import { initializeApp } from "firebase/app";
import { add } from '../../DataAccess/firebase';
import { getAnalytics, isSupported } from "firebase/analytics";
import { updateDocById } from "../../DataAccess/firebase";
import { deleteFromCache, updateCacheWithNewData, updateCacheWithUpdatedArrayData } from "../middleware/cacheMiddelware";
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
    return await getDataByCollectionName(section);
}

export async function getLazyLoadingImages(lazyLoadingArgs: any): Promise<{ images: any[], lastVisibleIndex: any }> {
    return await getLazyLoadingImagesFromDb(lazyLoadingArgs.lastDoc, lazyLoadingArgs.limitNumber);
}
export async function updateImage(data: any): Promise<any> {
    
    var file = data.file;
    var title = data.title;
    var collection = data.collection;
    var imageId = data.imageId;
    var style = data.style;
   
    try{
    if(file)
    {
        deleteDocById(imageId,collection);
        var { url, title, collection } = await uploadToStorage(data);  
        await updateDocById(imageId, {url: url, title: title, collection: collection,Style : style});
        // updateCacheWithNewData({url: url, title: title, collection: collection,Style : style});
        return { url, title, collection };
     }
    else{
        await updateDocById(imageId, {title: title, collection: collection,Style : style});

        return { title, collection };
    }
    return;
    }
    catch(e){
        return "Error updating document: " + e;
    }
}

export async function uploadImage(image: any): Promise<any> {
    var { url, title, collection } = await uploadToStorage(image);

    addImageToDb({url: url, title: title, collection: collection,Style : image.style});
    return {
        url,
        title,
        collection,
        createDate : new Date().toISOString()
    };
}
async function uploadToStorage(image: any) {
    const dateTime = new Date().toISOString();
    var file = image.file;
    var title = image.title;
    var collection = image.collection;
    const storageRef = ref(storage, `images/${title + "   " + dateTime}`);
    const metaData = {
        contentType: image.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metaData);
    const url = await getDownloadURL(snapshot.ref);
    return { url, title, collection };
}

 async function addImageToDb(imageData: any) {

    const index = await getDataByCollectionName(imageData.collection).then((data) => data.length);
     const imageDTO ={
            url: imageData.url,
            likes: 0,
            title: imageData.title,
            Style : imageData.Style,
            index: index,
            createDate: new Date().toISOString()
     }
    await add(imageDTO, imageData.collection);
    return;
}

export async function saveImagesLayout(images: any[]): Promise<any> {
    images.forEach(async (image) => {
        await updateDocById(image.id, image);
    });
}

export async function likeImage(imageId: string): Promise<any> {
    await likeImageById(imageId);
}

export async function deleteImage(imageId: string,collection:string): Promise<any> {
    await deleteDocById(imageId,collection);
    // deleteFromCache(imageId);
    return;
}
