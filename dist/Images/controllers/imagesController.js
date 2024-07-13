"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const imagesService_1 = require("../services/imagesService");
class ImagesController {
    constructor() {
    }
    async updateImage(req) {
        try {
            const data = req.body;
            data.file = req.file;
            var newData = await (0, imagesService_1.updateImage)(data);
            return newData;
        }
        catch (error) {
            return;
        }
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
            return await (0, imagesService_1.uploadImage)(data);
        }
        catch (error) {
        }
    }
    async likeImage(imageId, res) {
        try {
            await (0, imagesService_1.likeImage)(imageId);
            res.status(200).json(true);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async deleteImage(req, res) {
        try {
            const imageId = req.body.imageId;
            const collection = req.body.collection;
            await (0, imagesService_1.deleteImage)(imageId, collection);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.ImagesController = ImagesController;
