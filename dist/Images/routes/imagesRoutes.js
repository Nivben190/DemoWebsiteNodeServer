"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesController_1 = require("../controllers/imagesController");
const router = express_1.default.Router();
const imagesController = new imagesController_1.ImagesController();
const multer_1 = __importDefault(require("multer"));
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
 *               lastDoc:
 *                 type: number
 *               limitNumber:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful retrieval of images
 *       500:
 *         description: Server error
 */
router.post('/lazyloading', async (req, res) => {
    try {
        const images = await imagesController.getLazyLoadingImages(req, res);
        res.status(200).json(images);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
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
router.post('/getBySection', async (req, res) => {
    try {
        const images = await imagesController.getImagesBySection(req, res);
        res.status(200).json(images);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
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
 *               title:
 *                 type: string
 *               collection:
 *                 type: string
 *               style:
 *                 type: string
 *     responses:
 *       200:
 *         description: Image uploaded
 *       500:
 *         description: Internal server error
 */
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { title, collection, style } = req.body;
        const data = { file: req.file, title, collection, style };
        var imageData = await imagesController.uploadImage(data);
        res.status(200).json(imageData !== null && imageData !== void 0 ? imageData : { message: 'Image uploaded' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
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
router.post('/delete', async (req, res) => {
    try {
        await imagesController.deleteImage(req, res);
        res.status(200).json({ message: 'Image deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
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
router.post('/like', async (req, res) => {
    try {
        const imageId = req.body.imageId;
        const objectId = await imagesController.likeImage(imageId, res);
        res.status(200).json(objectId);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update an image
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image to upload
 *       - in: body
 *         name: body
 *         description: Image data
 *         schema:
 *           type: object
 *           properties:
 *             image:
 *               type: string
 *               format: binary
 *             title:
 *               type: string
 *             collection:
 *               type: string
 *             imageId:
 *               type: string
 *             style:
 *               type: string
 *     responses:
 *       200:
 *         description: Image updated
 *       500:
 *         description: Internal server error
 */
router.put('/update', upload.single('image'), async (req, res) => {
    try {
        var newData = await imagesController.updateImage(req);
        res.status(200).json(newData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * @swagger
 * /updateLayout:
 *   put:
 *     summary: Save images layout
 *     description: Save images layout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     index:
 *                       type: number
 *                     id:
 *                       type: string
 *                     collection:
 *                       type: string
 *     responses:
 *       200:
 *         description: Images layout saved
 *       500:
 *         description: Internal server error
 */
router.put('/updateLayout', async (req, res) => {
    try {
        await imagesController.saveImagesLayout(req, res);
    }
    catch (error) {
    }
});
exports.default = router;
