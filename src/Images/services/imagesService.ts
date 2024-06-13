

import env from "../../config/env";

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const blobServiceClient = BlobServiceClient.fromConnectionString(env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(env.AZURE_STORAGE_CONTAINER_NAME);

export async function getImages(): Promise<any> {
    const images = [];
    for await (const blob of containerClient.listBlobsFlat()) {
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const image = {
            name: blob.name,
            url: `${tempBlockBlobClient.url}`
        };
    images.push(image);
    }
    return images;
}


export async function uploadImage(image: any) {
    const blobName = uuidv1() + '.jpg';
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
     await blockBlobClient.uploadFile(image.filepath)
    return blobName;
}

export async function deleteImage(imageId: string): Promise<any> {
    const blockBlobClient = containerClient.getBlockBlobClient(imageId);
    await blockBlobClient.delete();
    return;
}
