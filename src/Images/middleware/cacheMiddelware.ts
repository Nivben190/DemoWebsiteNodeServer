import { Request, Response, NextFunction } from 'express';
import Redis from "ioredis"
const client = new Redis("rediss://default:AYv4AAIjcDExMmZhZDJjY2RlNzA0YzEzOWM3NDUxMDQ2Y2NjZDYwOXAxMA@crucial-dassie-35832.upstash.io:6379");
export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { imageName,lastDoc } = req.params;
    const objectToCheck = {
        imageName,
        lastDoc
    }
    try {
        const data = await client.get(JSON.stringify(objectToCheck));
        if (data !== null) {
            res.send(data);
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        next();
    }
};

export const cacheMiddlewareForLazyLoading = async (cacheKey:string) => {
    try {
        const data = await client.get(cacheKey);
        if (data !== null) {
            return data;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}


export async function deleteFromCache(id:string) {
    const keys = await client.keys('images:*');
    keys.forEach(async key => {
        const cachedData = await client.get(key);
        if (cachedData) {
            const cachedResult = JSON.parse(cachedData);
            const index = cachedResult.images.findIndex((image: { id: any; }) => image.id === id);
            if (index !== -1) {
                cachedResult.images.splice(index, 1);
                client.set(key, JSON.stringify(cachedResult));
            }
        }
    });
}


export async function updateCacheWithNewData(newData:any) {
    const keys = await client.keys('images:*');
    
    keys.forEach(async key => {
        const cachedData = await client.get(key);
        
        if (cachedData) {
            const cachedResult = JSON.parse(cachedData);
            const index = cachedResult.images.findIndex((image: { id: any; }) => image.id === newData.id);
            
            if (index !== -1) {
                cachedResult.images[index] = {
                    ...cachedResult.images[index],
                    title: newData.title,
                    Style : newData.Style
                };
                client.set(key, JSON.stringify(cachedResult));
            }
        }
    });
}
    



 export const cacheImage = (cacheKey:string,data:any) => {
    try {
   client.set(cacheKey, JSON.stringify(data), 'EX', 3600);
    }
    catch(e){
        console.log(e);
    }
    
};

