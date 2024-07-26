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



 export const cacheImage = (cacheKey:string,data:any) => {
    try {
   client.set(cacheKey, JSON.stringify(data), 'EX', 3600);
    }
    catch(e){
        console.log(e);
    }
    
};

