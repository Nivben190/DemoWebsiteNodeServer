import { Request, Response } from 'express';
import { getImages, uploadImage ,deleteImage} from '../services/imagesService';
import { createProductionLogger } from "../../loggers/mongoProductionLogger";
import { Logger } from 'winston';

export class ImagesController {
    constructor() {


    }
    public async getImages(req: Request, res: Response): Promise<void> {
        const logger = await createProductionLogger();
        try {
             const images = await getImages();

            res.status(200).json(images);
        } catch (error) {
            logger.error('Error getting images', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async uploadImage(imageFile: any, res: Response): Promise<void> {
        const logger = await createProductionLogger();

        try {
              await uploadImage(imageFile);
        } catch (error) {
            logger.error('Error uploading image', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async deleteImage(req: Request, res: Response): Promise<void> {
        const logger = await createProductionLogger();

        try {
            const imageId = req.params.imageId;
            await deleteImage(imageId);
            res.status(200).json({ message: 'Image deleted' });
        } catch (error) {
            logger.error('Error deleting image', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

