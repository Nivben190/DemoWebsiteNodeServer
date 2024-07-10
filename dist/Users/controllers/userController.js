"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const loginHelper_1 = require("../utils/loginHelper");
class UserController {
    constructor() {
    }
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const error = (0, loginHelper_1.validate)(email, password);
            if (error) {
                res.status(400).json({ error });
                return;
            }
            const Args = { email: email, password: password };
            const user = await (0, userService_1.registerUser)(Args);
            res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const error = (0, loginHelper_1.validate)(email, password);
            if (error) {
                res.status(400).json({ error });
                return;
            }
            const user = await (0, userService_1.findUserByEmailAndPassword)(email, password);
            if (!user) {
                res.status(401).json({ error: 'Invalid username or password' });
                return;
            }
            res.status(200).json({ message: 'User logged in successfully', user });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.UserController = UserController;
