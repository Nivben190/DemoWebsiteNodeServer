import express, { Request, Response } from 'express';
import { getDb } from '../../DataAccess/mongo.ts';
const router = express.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
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
    const db = await getDb();
    if (!db) {
        res.status(500).send('Internal server error');
        return;
    }
    db.collection('users').findOne({
        email: req.body.email,
        password: req.body.password
    });
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
    const db = await getDb();
    if (!db) {
        res.status(500).send('Internal server error');
        return;
    }
    db.collection('users').insertOne(req.body);
    res.status(201).send('User created');
});

export default router;