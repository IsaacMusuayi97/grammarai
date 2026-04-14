const express = require('express');
const router = express.Router();
const { summarizeText } = require('../services/summarizeService');
const authMiddleware = require('../middleware/authMiddleware');

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
        const summary = await summarizeText(cleanText);
        return res.status(200).json({ summary });
    } catch (error) {
        console.error("Error summarizing text:", error);
        return res.status(500).json({ error: "SERVER_ERROR" });
    }
});

module.exports = router;