import express, { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
const userController = new UserController();
const router = express.Router();
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
router.post('/login', async (req: Request, res: Response) => {
    try
    {
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
router.post('/register', async (req: Request, res: Response) => {
   try
   {
       await userController.register(req, res);
   }
    catch (error) {
         res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;