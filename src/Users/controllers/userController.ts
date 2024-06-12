import { Request, Response } from 'express';
import { registerUser,findUserByEmailAndPassword } from '../services/userService';
export class UserController {

    constructor() {
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }
            const loginArgs = { email: email, password: password };
            const user = await registerUser(loginArgs);

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }

            const isLogin = await findUserByEmailAndPassword(email, password);

            if (!isLogin) {
                res.status(401).json({ error: 'Invalid username or password' });
                return;
            }

            res.status(200).json({ message: 'User logged in successfully', isLogin });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}