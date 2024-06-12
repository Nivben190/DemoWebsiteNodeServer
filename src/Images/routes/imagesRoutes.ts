import express, { Request, Response } from 'express';
import { ImagesController } from '../controllers/imagesController';
const router = express.Router();
const imagesController = new ImagesController();
const formidable = require('formidable');

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get all images
 *     description: Get all images.
 *     responses:
 *       200:
 *         description: Successful retrieval of images
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req: Request, res: Response) => {
    try {
       const images =  await imagesController.getImages(req, res);
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

//upload 
/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload image
 *     description: Upload an image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded
 *       500:
 *         description: Internal server error
 */

router.post('/upload', async (req: Request, res: Response) => {

    const form = new formidable.IncomingForm();
    form.parse(req, async function (err :any, fields :any, files :any) {
        
        const file = files.image[0] ;
        try {
            await imagesController.uploadImage(file,res);
            res.status(201).json({ message: 'Image uploaded' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
      });
        
    });
//delete
/**
 * @swagger
 * /images/delete:
 *   delete:
 *     summary: Delete image
 *     description: Delete an image.
 *     responses:
 *       200:
 *         description: Image deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/delete', async (req: Request, res: Response) => {
    try {
        await imagesController.deleteImage(req, res);
        res.status(200).json({ message: 'Image deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

export default router;