import express, { Request, Response } from 'express';
import { ImagesController } from '../controllers/imagesController';
const router = express.Router();
const imagesController = new ImagesController();
const formidable = require('formidable');



//lazy loading images 
/**
 * @swagger
 * /images/lazyloading:
 *   get:
 *     summary: Get lazy loading images
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstIndex:
 *                 type: number
 *               skipIndex:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful retrieval of images
 *       500:
 *         description: Server error
 */
router.post('/lazyloading', async (req: Request, res: Response) => {
    try {
        const images = await imagesController.getLazyLoadingImages(req, res);
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

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

router.get('/getallimages', async (req: Request, res: Response) => {
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
 *            schema:
*             type: object
*             properties:
*               image:
*                 type: string
*                 format: binary
*               title:
*                 type: string
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
         const title = fields.title[0]; 
         file.title = title;
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

/**
 * @swagger
 * /images/like:
 *   post:
 *     summary: Like image
 *     description: Like an image.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageId:
 *                 type: string
 *             required:
 *               - imageId
 *     responses:
 *       200:
 *         description: Image liked
 *       500:
 *         description: Internal server error
 */

router.post('/like', async (req: Request, res: Response) => {
    try {
        const imageId = req.body.imageId;
      const objectId =   await imagesController.likeImage(imageId, res);
        res.status(200).json(objectId);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

export default router;