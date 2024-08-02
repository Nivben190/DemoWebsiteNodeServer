import { Request, Response } from 'express';
import {uploadImage ,deleteImage, likeImage, getLazyLoadingImages, getImagesBySection, updateImage, saveImagesLayout} from '../services/imagesService';

export class ImagesController {
    
    constructor() {
    }

    public async updateImage(req: Request): Promise<any> {
        try {
            const data = req.body;
            data.file = req.file;
            var newData = await updateImage(data);
            return newData;
        } catch (error) {
            return ;
        }
    }

    public async saveImagesLayout(req: Request, res: Response): Promise<void> {
        try {
            const images = req.body;
            
            await saveImagesLayout(images);
            res.status(200).json(true);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    public async getLazyLoadingImages(req: Request, res: Response): Promise<any> {
        try {
            
            const imagesArg = await getLazyLoadingImages(req.body);
            return imagesArg;
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
  
    public async getImagesBySection(req: Request, res: Response): Promise<void> {
        try {
            const section = req.body.section;
            const images = await getImagesBySection(section);
            return images;
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    public async uploadImage(data: any): Promise<any> {

        try {
              return await uploadImage(data);
        } catch (error) {
        }
    }
    public async likeImage(imageId: string, res: Response): Promise<void> {

        try {
             await likeImage(imageId);
           
            res.status(200).json(true);            
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteImage(req: Request, res: Response): Promise<void> {

        try {
            const imageId = req.body.imageId;
            const collection = req.body.collection;            
            await deleteImage(imageId,collection);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

