import express, { Request, Response } from 'express';
import { ImagesController } from '../controllers/imagesController';
const router = express.Router();
const imagesController = new ImagesController();
const formidable = require('formidable');
import multer from 'multer';

//lazy loading images 
/**
 * @swagger
 * /images/lazyloading:
 *   post:
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


//get images by section
/**
 * @swagger
 * /images/getBySection:
 *   post:
 *     summary: Get images by section
 *     description: Get images by section.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               section:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of images
 *       500:
 *         description: Internal server error
 */


router.post('/getBySection', async (req: Request, res: Response) => {
    try {
       const images =  await imagesController.getImagesBySection(req, res);
       
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
*               collection:
*                 type: string
 *     responses:
 *       200:
 *         description: Image uploaded
 *       500:
 *         description: Internal server error
 */

const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { title, collection } = req.body;
        const data = { file: req.file, title, collection };

        var imageData = await imagesController.uploadImage(data);
        
        res.status(200).json(imageData ?? { message: 'Image uploaded' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

// router.post('/upload', async (req: Request, res: Response) => {

//     const form = new formidable.IncomingForm();
//     form.parse(req, async function (err :any, fields :any, files :any) {
//         const file = files.image[0] ;
//          const title = fields.title[0]; 
//          const container = fields.container[0];
//          file.title = title;
//         try {
//             await imagesController.uploadImage(file,res,container);
//             res.status(201).json({ message: 'Image uploaded' });
//         } catch (error) {
//             res.status(500).json({ error: 'Internal server error' });
//         }
//       });
        
//     });
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
router.post('/delete', async (req: Request, res: Response) => {
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


// update image 
/**
 * @swagger
 * /images/update:
 *   put:
 *     summary: Update image
 *     description: Update an image.
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
 *               title:
 *                 type: string
 *               collection:
 *                 type: string
 *               imageId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Image updated
 *       500:
 *         description: Internal server error
 */
router.put('/update', upload.single('image'), async (req: Request, res: Response) => {
    try {
        
        var newData =await imagesController.updateImage(req);
        res.status(200).json(newData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;