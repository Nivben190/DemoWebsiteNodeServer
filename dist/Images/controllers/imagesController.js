"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const imagesService_1 = require("../services/imagesService");
const mongoProductionLogger_1 = require("../../loggers/mongoProductionLogger");
class ImagesController {
    constructor() {
    }
    async getImages(req, res) {
        const logger = await (0, mongoProductionLogger_1.createProductionLogger)();
        try {
            const images = await (0, imagesService_1.getImages)();
            return images;
        }
        catch (error) {
            logger.error('Error getting images', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async uploadImage(imageFile, res) {
        const logger = await (0, mongoProductionLogger_1.createProductionLogger)();
        try {
            await (0, imagesService_1.uploadImage)(imageFile);
        }
        catch (error) {
            logger.error('Error uploading image', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async likeImage(imageId, res) {
        const logger = await (0, mongoProductionLogger_1.createProductionLogger)();
        try {
            const objectId = await (0, imagesService_1.likeImage)(imageId);
            return objectId;
        }
        catch (error) {
            logger.error('Error liking image', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async deleteImage(req, res) {
        const logger = await (0, mongoProductionLogger_1.createProductionLogger)();
        try {
            const imageId = req.params.imageId;
            await (0, imagesService_1.deleteImage)(imageId);
        }
        catch (error) {
            logger.error('Error deleting image', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.ImagesController = ImagesController;
