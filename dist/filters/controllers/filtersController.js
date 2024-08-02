"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersController = void 0;
const filterService_1 = require("../services/filterService");
class FiltersController {
    constructor() {
    }
    async updateFilter(req) {
        try {
            const { id, name } = req.body;
            await (0, filterService_1.updateFilter)(id, name);
        }
        catch (error) {
            return;
        }
    }
    async getFilters(req, res) {
        try {
            const filters = await (0, filterService_1.getFilters)();
            return filters;
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async addFilter(req, res) {
        try {
            const { name } = req.body;
            await (0, filterService_1.addFilter)(name);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async deleteFilter(req, res) {
        try {
            const { id } = req.body;
            await (0, filterService_1.deleteFilter)(id);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.FiltersController = FiltersController;
