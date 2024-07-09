import { Request, Response } from 'express';
import {uploadImage ,deleteImage, likeImage, getLazyLoadingImages, getImagesBySection} from '../services/imagesService';

export class ImagesController {
    constructor() {
    }
    public async getLazyLoadingImages(req: Request, res: Response): Promise<void> {
        try {
            const images = await getLazyLoadingImages(req.body);
            return images;
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


    public async uploadImage(data: any): Promise<void> {

        try {
              await uploadImage(data);
        } catch (error) {
        }
    }
    public async likeImage(imageId: string, res: Response): Promise<void> {

        try {
           const objectId =  await likeImage(imageId);
            return objectId;
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteImage(req: Request, res: Response): Promise<void> {

        try {
            const imageId = req.params.imageId;
            await deleteImage(imageId);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

