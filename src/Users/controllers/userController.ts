import { Request, Response } from 'express';
import { registerUser,findUserByEmailAndPassword } from '../services/userService';
import { validate } from '../utils/loginHelper';
import { createProductionLogger } from '../../loggers/mongoProductionLogger';
import { Logger } from 'winston';
export class UserController {
    private logger :Logger | null = null;
   

    constructor() {
    }

    public async register(req: Request, res: Response): Promise<void> {
        this.logger = await createProductionLogger();
        try {
            const { email, password } = req.body;

            const error = validate(email, password);

            if (error) {
                const log ={
                    message: 'Invalid email or password',
                    error: error,
                    metaData : { email, password }
                }
                this.logger?.error(log);
                res.status(400).json({ error });
                return;
            }

            const Args = { email: email, password: password };
            const user = await registerUser(Args);

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            const log ={
                message: 'Error registering user',
                error: error,
                metaData : { email: req.body.email, password: req.body.password }
            }
            this.logger?.error(log);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        this.logger = await createProductionLogger();

        try {
            const { email, password } = req.body;

            const error = validate(email, password);
            if (error) {
                const log ={
                    message: 'Invalid email or password',
                    error: error,
                    metaData : { email, password }
                }
                this.logger?.error(log);
                res.status(400).json({ error });
                return;
            }

            const user = await findUserByEmailAndPassword(email, password);

            if (!user) {
                res.status(401).json({ error: 'Invalid username or password' });
                return;
            }

            res.status(200).json({ message: 'User logged in successfully', user });
        } catch (error ) {
            const log ={
                message: 'Error logging in user',
                error: error,
                metaData : { email: req.body.email, password: req.body.password }
            }
            this.logger?.error(log);
            res.status(500).json({ error: 'Internal server error' });        }
    }
}