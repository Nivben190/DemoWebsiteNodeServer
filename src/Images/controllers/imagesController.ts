import { Request, Response } from 'express';
import { getImages, uploadImage ,deleteImage, likeImage, getLazyLoadingImages, getImagesBySection} from '../services/imagesService';
import { createProductionLogger } from "../../loggers/mongoProductionLogger";

export class ImagesController {
    constructor() {
    }
    public async getLazyLoadingImages(req: Request, res: Response): Promise<void> {
        const logger = await createProductionLogger();
        try {
            const images = await getLazyLoadingImages(req.body);
            return images;
        } catch (error) {
            logger.error('Error getting images', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async getImages(req: Request, res: Response): Promise<void> {
        const logger = await createProductionLogger();
        try {
             const images = await getImages();
             return images;
        } catch (error) {
            logger.error('Error getting images', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async getImagesBySection(req: Request, res: Response): Promise<void> {
        const logger = await createProductionLogger();
        try {
            const section = req.body.section;
            const images = await getImagesBySection(section);
            return images;
        } catch (error) {
            logger.error('Error getting images', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    public async uploadImage(imageFile: any, res: Response,container:string | undefined ): Promise<void> {
        const logger = await createProductionLogger();

        try {
         
              await uploadImage(imageFile,container);
        } catch (error) {
            logger.error('Error uploading image', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async likeImage(imageId: number, res: Response): Promise<void> {
        const logger = await createProductionLogger();

        try {
           const objectId =  await likeImage(imageId);
              return objectId;
        } catch (error) {
            logger.error('Error liking image', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteImage(req: Request, res: Response): Promise<void> {
        const logger = await createProductionLogger();

        try {
            const imageId = req.params.imageId;
            await deleteImage(imageId);
        } catch (error) {
            logger.error('Error deleting image', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

