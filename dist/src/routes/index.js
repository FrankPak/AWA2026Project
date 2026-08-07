"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = require("../middleware/validateToken");
const router = (0, express_1.Router)();
router.get('/api/private', validateToken_1.validateToken, async (req, res) => {
    try {
        return res.status(200).json({ message: "This is protected secure route!" });
    }
    catch (error) {
        console.error(`Error while saving offer: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map