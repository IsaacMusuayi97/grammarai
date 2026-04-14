const express = require('express');
const router = express.Router();
const { humanizeText } = require('../services/humanizeService');
const authMiddleware = require('../middleware/authMiddleware');
//const authMiddleware = require('../middleware/authMiddleware');

router.post("/", authMiddleware, async (req, res) => {

    const { text } = req.body;
    const cleanText =
    typeof text === "string" ? text.trim() : undefined;

    if (!cleanText) {
        return res.status(400).json({ error: "TEXT_REQUIRED" });
    }else if (cleanText.length < 250) {
        return res.status(400).json({ error: "TEXT_TOO_SHORT" });
    }else if (cleanText.length > 10000) {
        return res.status(400).json({ error: "TEXT_TOO_LONG" });
    }

    try {  
        const result = await humanizeText(cleanText);
        return res.status(200).json({ result });               
    } catch (error) {
        console.error("Error processing humanize request:", error);
        return res.status(500).json({error: "SERVER_ERROR"});
    }
});

module.exports = router;