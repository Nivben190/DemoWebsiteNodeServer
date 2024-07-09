"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const imagesService_1 = require("../services/imagesService");
class ImagesController {
    constructor() {
    }
    async getLazyLoadingImages(req, res) {
        try {
            const images = await (0, imagesService_1.getLazyLoadingImages)(req.body);
            return images;
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getImagesBySection(req, res) {
        try {
            const section = req.body.section;
            const images = await (0, imagesService_1.getImagesBySection)(section);
            return images;
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async uploadImage(data) {
        try {
            await (0, imagesService_1.uploadImage)(data);
        }
        catch (error) {
        }
    }
    async likeImage(imageId, res) {
        try {
            const objectId = await (0, imagesService_1.likeImage)(imageId);
            return objectId;
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async deleteImage(req, res) {
        try {
            const imageId = req.params.imageId;
            await (0, imagesService_1.deleteImage)(imageId);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.ImagesController = ImagesController;
