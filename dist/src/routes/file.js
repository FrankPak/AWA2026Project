"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const File_1 = require("../models/File");
const validateToken_1 = require("../middleware/validateToken");
const fileRouter = (0, express_1.Router)();
fileRouter.post('/file', validateToken_1.validateToken, async (req, res) => {
    try {
        //console.log(req.body.filename)
        //console.log(validateToken)
        const file = await File_1.File.create({
            filename: req.body.filename,
            content: req.body.content,
            createdAt: Date.now()
        });
        return res.status(200).json(file);
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
fileRouter.get('/files', async (req, res) => {
    try {
        const files = await File_1.File.find();
        return res.status(200).json(files);
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = fileRouter;
//# sourceMappingURL=file.js.map