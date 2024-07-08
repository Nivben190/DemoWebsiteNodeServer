// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, increment } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBVnn0AZ8IWdmtzZupoTPxxrMu1_lhVJB8",
  authDomain: "dianashimongallery.firebaseapp.com",
  projectId: "dianashimongallery",
  storageBucket: "dianashimongallery.appspot.com",
  messagingSenderId: "393221943549",
  appId: "1:393221943549:web:a162cca3ef1bc695950e94",
  measurementId: "G-JQ5P7Q88S1"
};

// Initialize Firebase
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
        const docRef = doc(db, 'images', imageId);
        await setDoc(docRef, { likes:increment(1)  }, { merge: true });
        return `Document updated with ID: ${docRef.id}`;
    } catch (e) {
        return "Error updating document: " + e;
    }
}

export async function deleteImageById(imageId: string): Promise<any> {
    try {
        const docRef = doc(db, 'images', imageId);
        await deleteDoc(docRef);
    } catch (e) {
        return "Error deleting document: " + e;
    }
}

export async function getImagesByCollectionName(collectionName: string): Promise<any> {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const images = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return images;
    } catch (e) {
        return "Error getting documents: " + e;
    }
}

export async function getLazyLoadingImagesFroDb(lazyLoadingArgs: any): Promise<any> {
    const firstIndex = lazyLoadingArgs.firstIndex;
    const skipIndex = lazyLoadingArgs.skipIndex;
    const querySnapshot = await getDocs(collection(db, 'images'));
    const images = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
     return images.slice(firstIndex, skipIndex);
}