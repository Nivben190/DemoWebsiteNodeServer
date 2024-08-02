"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filtersController_1 = require("../controllers/filtersController");
const router = (0, express_1.Router)();
const filterController = new filtersController_1.FiltersController();
// routes for add update delete filters with swagger 
/**
 * @swagger
 * /filters/add:
 *   post:
 *     summary: Add filter
 *     description: Add a new filter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filter added
 *       500:
 *         description: Internal server error
 */
router.post('/add', async (req, res) => {
    try {
        await filterController.addFilter(req, res);
        res.status(200).json({ message: 'Filter added' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * @swagger
 * /filters/update:
 *   put:
 *     summary: Update filter
 *     description: Update a filter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filter updated
 *       500:
 *         description: Internal server error
 */
router.put('/update', async (req, res) => {
    try {
        await filterController.updateFilter(req);
        res.status(200).json({ message: 'Filter updated' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * @swagger
 * /filters/delete:
 *   delete:
 *     summary: Delete filter
 *     description: Delete a filter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filter deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/delete', async (req, res) => {
    try {
        await filterController.deleteFilter(req, res);
        res.status(200).json({ message: 'Filter deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * @swagger
 * /filters/get:
 *   get:
 *     summary: Get all filters
 *     description: Get all filters.
 *     responses:
 *       200:
 *         description: Filters fetched
 *       500:
 *         description: Internal server error
 */
router.get('/get', async (req, res) => {
    try {
        const filters = await filterController.getFilters(req, res);
        res.status(200).json(filters);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
