"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userController = new userController_1.UserController();
const router = express_1.default.Router();
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Login a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       500:
 *         description: Internal server error

 */
router.post('/login', async (req, res) => {
    try {
        await userController.login(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       500:
 *         description: Internal server error
 */
router.post('/register', async (req, res) => {
    try {
        await userController.register(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
