import { ErrorLoggerService } from "../../loggers/mongoDbLoggerService";
import { Request, Response } from 'express';
import { getImages, uploadImage ,deleteImage} from '../services/imagesService';
import formidable from "formidable";

export class ImagesController {
    private errorLoggerService: ErrorLoggerService;
    constructor() {
        this.errorLoggerService = new ErrorLoggerService();
    }
    public async getImages(req: Request, res: Response): Promise<void> {
        try {
             const images = await getImages();

            res.status(200).json(images);
        } catch (error) {
            await this.errorLoggerService.logError(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async uploadImage(imageFile: any, res: Response): Promise<void> {
        try {
            console.log(imageFile);
            
              await uploadImage(imageFile);
        } catch (error) {
            await this.errorLoggerService.logError(error);
            console.log(error);
        }
    }
    public async deleteImage(req: Request, res: Response): Promise<void> {
        try {
            const imageId = req.params.imageId;
            await deleteImage(imageId);
            res.status(200).json({ message: 'Image deleted' });
        } catch (error) {
            await this.errorLoggerService.logError(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

