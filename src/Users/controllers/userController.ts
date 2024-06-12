import { Request, Response } from 'express';
import { registerUser,findUserByEmailAndPassword } from '../services/userService';
import { validate } from '../utils/loginHelper';
import { ErrorLoggerService } from '../../loggers/mongoDbLoggerService';
export class UserController {
    private errorLoggerService ;
   

    constructor() {
        this.errorLoggerService = new ErrorLoggerService();
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const error = validate(email, password);

            if (error) {
                const log ={
                    message: 'Invalid email or password',
                    error: error,
                    metaData : { email, password }
                }
                await this.errorLoggerService.logError(log);
                res.status(400).json({ error });
                return;
            }

            const Args = { email: email, password: password };
            const user = await registerUser(Args);

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            await this.errorLoggerService.logError(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const error = validate(email, password);
            if (error) {
                const log ={
                    message: 'Invalid email or password',
                    error: error,
                    metaData : { email, password }
                }
                await this.errorLoggerService.logError(log);              
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
            await this.errorLoggerService.logError(error);
            res.status(500).json({ error: 'Internal server error' });        }
    }
}