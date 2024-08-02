// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, increment ,query,limit,orderBy, startAfter, QueryDocumentSnapshot, Timestamp, } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { cacheImage, cacheMiddlewareForLazyLoading } from "../Images/middleware/cacheMiddelware";

export const firebaseConfig = {
  apiKey: "AIzaSyBVnn0AZ8IWdmtzZupoTPxxrMu1_lhVJB8",
  authDomain: "dianashimongallery.firebaseapp.com",
  projectId: "dianashimongallery",
  storageBucket: "dianashimongallery.appspot.com",
  messagingSenderId: "393221943549",
  appId: "1:393221943549:web:a162cca3ef1bc695950e94",
  measurementId: "G-JQ5P7Q88S1"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function add(data:any, collectionName:string) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return `Document added with ID: ${docRef.id}`;

    } catch (e) {
        return "Error adding document: " + e;
    }
}

export async function likeImageById(imageId: string): Promise<any> {
    try {
        
        const docRef = doc(db, 'gallery', imageId);
        await setDoc(docRef, { likes:increment(1)  }, { merge: true });
    } catch (e) {
        return "Error updating document: " + e;
    }
}

export async function updateDocById(docId: string, data: any): Promise<any> {
    try {
        var collection = data.collection;
        delete data.collection;
        const docRef = doc(db, collection, docId);
        await setDoc(docRef, data, { merge: true });
        return `Document updated with ID: ${docRef.id}`;
    } catch (e) {
        return "Error updating document: " + e;
    }
  
}

export async function deleteDocById(id: string,collection:string): Promise<any> {
    try {
        const docRef = doc(db, collection, id);
        await deleteDoc(docRef);
    } catch (e) {
        return "Error deleting document: " + e;
    }
}

export async function getDataByCollectionName(collectionName: string): Promise<any> {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return data;
    } catch (e) {
        return "Error getting documents: " + e;
    }
}
export async function getLazyLoadingImagesFromDb(lastDoc: any | null, limitNumber: number): Promise<{ images: any[], lastVisibleIndex: number | null }> {
    let imagesQuery;
    
    let images: any[] = [];
    // const cacheKey = `images:${lastDoc ? lastDoc.seconds : 'start'}:${limitNumber}`;
    // var cachedData = await cacheMiddlewareForLazyLoading(cacheKey);
    // if(cachedData){
    //     console.log(`Cache hit for key ${cacheKey}`);
    //     const cachedResult = JSON.parse(cachedData);
    //     return { images: cachedResult.images, lastVisibleCreateDate: cachedResult.lastVisibleCreateDate };
    // }
    // console.log(`Cache miss for key ${cacheKey}`);

    
    if (lastDoc) {
       imagesQuery = query(
            collection(db, 'gallery'),
            orderBy('index'),
            startAfter(lastDoc),
            limit(limitNumber)
        );
    } else {
        imagesQuery = query(
            collection(db, 'gallery'),
            orderBy('index'),
            limit(limitNumber)
        );
    }
    try{
        const querySnapshot = await getDocs(imagesQuery);
        if (querySnapshot.empty) {
            console.log('No more  to retrieve.');
            return { images, lastVisibleIndex: null };
        } else {
            images = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        }
    
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
        const lastVisibleIndex = lastVisible?.data().index ;
        // cacheImage(cacheKey, { images, lastVisibleCreateDate });

        return { images, lastVisibleIndex };
    }
    catch(e){
        return { images, lastVisibleIndex: null };
        console.log("Error getting documents: " + e);
    }
 
}