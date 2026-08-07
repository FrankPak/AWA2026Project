"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Topic_1 = require("../models/Topic");
const validateToken_1 = require("../middleware/validateToken");
const topicRouter = (0, express_1.Router)();
topicRouter.get('/topics', async (req, res) => {
    try {
        const topics = await Topic_1.Topic.find();
        return res.status(200).json(topics);
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
topicRouter.post('/topic', validateToken_1.validateToken, async (req, res) => {
    try {
        //console.log(req.body)
        //console.log(validateToken)
        const topic = await Topic_1.Topic.create({
            title: req.body.title,
            content: req.body.content,
            username: req.body.username,
            createdAt: Date.now()
        });
        return res.status(200).json(topic);
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
topicRouter.delete('/topic/:id"', validateToken_1.validateAdminToken, async (req, res) => {
    try {
        return res.status(200).json({ message: "Topic deleted successfully." });
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = topicRouter;
//# sourceMappingURL=topic.js.map