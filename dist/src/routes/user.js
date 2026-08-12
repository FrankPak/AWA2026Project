"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const inputValidation_1 = require("../validators/inputValidation");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', 
//usernameValidator("username"),
(0, inputValidation_1.emailValidator)("email"), (0, inputValidation_1.passValidator)("password"), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const existingUser = await User_1.User.findOne({ email: req.body.email });
        //console.log(existingUser)
        if (existingUser) {
            return res.status(403).json({ message: "Email already in use" });
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = await User_1.User.create({
            email: req.body.email,
            password: hash,
            //username: req.body.username,
            isAdmin: req.body.isAdmin ? req.body.isAdmin : false
        });
        return res.status(200).json(newUser);
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
/*
userRouter.get('/list', async (req: Request, res: Response) => {
    try {
        return res.status(200).json(userList)
    } catch (error: any) {
        console.error(`Error during registration: ${error}`)
        return res.status(500).json({error: "Internal Server Error"})
    }
})
*/
userRouter.post('/login', (0, inputValidation_1.emailValidator)("email"), (0, inputValidation_1.passValidator)("password"), async (req, res) => {
    try {
        const existingUser = await User_1.User.findOne({ email: req.body.email });
        console.log(existingUser);
        if (!existingUser) {
            return res.status(404).json({ message: "Login failed" });
        }
        if (bcryptjs_1.default.compareSync(req.body.password, existingUser.password)) {
            const jwtPayload = {
                _id: existingUser._id,
                username: existingUser.username,
                isAdmin: existingUser.isAdmin
            };
            const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET, { expiresIn: "2m" });
            return res.status(200).json({ success: true, token });
        }
        return res.status(401).json({ message: "Login failed, password incorrect" });
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map