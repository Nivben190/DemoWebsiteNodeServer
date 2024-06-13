"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const loginHelper_1 = require("../utils/loginHelper");
const mongoProductionLogger_1 = require("../../loggers/mongoProductionLogger");
class UserController {
    constructor() {
        this.logger = null;
    }
    async register(req, res) {
        var _a, _b;
        this.logger = await (0, mongoProductionLogger_1.createProductionLogger)();
        try {
            const { email, password } = req.body;
            const error = (0, loginHelper_1.validate)(email, password);
            if (error) {
                const log = {
                    message: 'Invalid email or password',
                    error: error,
                    metaData: { email, password }
                };
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(log);
                res.status(400).json({ error });
                return;
            }
            const Args = { email: email, password: password };
            const user = await (0, userService_1.registerUser)(Args);
            res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            const log = {
                message: 'Error registering user',
                error: error,
                metaData: { email: req.body.email, password: req.body.password }
            };
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.error(log);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async login(req, res) {
        var _a, _b;
        this.logger = await (0, mongoProductionLogger_1.createProductionLogger)();
        try {
            const { email, password } = req.body;
            const error = (0, loginHelper_1.validate)(email, password);
            if (error) {
                const log = {
                    message: 'Invalid email or password',
                    error: error,
                    metaData: { email, password }
                };
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(log);
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
            const log = {
                message: 'Error logging in user',
                error: error,
                metaData: { email: req.body.email, password: req.body.password }
            };
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.error(log);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.UserController = UserController;
