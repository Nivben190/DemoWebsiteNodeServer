

import env from "../../config/env";
import { getDb } from '../../DataAccess/mongo';
import { ObjectId } from 'mongodb'; // Ensure this import is at the top of your file
import createFromTime from 'mongodb';
const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const blobServiceClient = BlobServiceClient.fromConnectionString(env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(env.AZURE_STORAGE_CONTAINER_NAME);

export async function getImages(): Promise<any> {
    var db = await getDb();
    const collection = db?.collection('images');
    return await collection?.find({}).toArray();
}

export async function getImagesBySection(section: string): Promise<any> {
    var db = await getDb();
    const collection = db?.collection('images');
    return await collection?.find({section: section}).toArray();
}

export async function getLazyLoadingImages(lazyLoadingArgs: any): Promise<any> {
    var db = await getDb();
    const firstIndex = lazyLoadingArgs.firstIndex;
    const skipIndex = lazyLoadingArgs.skipIndex;
    const collection = db?.collection('images');
    return await collection?.find({}).skip(firstIndex).limit(skipIndex).toArray();
}


export async function uploadImage(image: any,container:string | undefined) {
    const blobName = uuidv1() + '.jpg';
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(image.filepath)
    addImageToDb({url: blockBlobClient.url, title: image.title, section: container});
    return blobName;
}
 async function addImageToDb(imageData: any) {
     const imageDTO ={
            url: imageData.url,
            likes: 0,
            title: imageData.title,
            section: imageData.section
     }
     var db = await getDb();
    const collection = db?.collection('images');
    await collection?.insertOne(imageDTO);
    return;
}

export async function likeImage(imageId: number): Promise<any> {
    var db = await getDb();
    const collection = db?.collection('images');
    const objectId = new ObjectId(imageId);
    const image = await collection?.findOne ({_id: objectId});
    
    if (image) {
        await collection?.updateOne({_id: objectId}, {$set: {likes: image.likes + 1}});
    }

    return objectId;
}

export async function deleteImage(imageId: string): Promise<any> {
    const blockBlobClient = containerClient.getBlockBlobClient(imageId);
    await blockBlobClient.delete();
    return;
}
