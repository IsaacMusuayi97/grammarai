const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const cleanEmail = typeof email === "string" ? email.trim() : undefined;
        const cleanPassword = typeof password === "string" ? password.trim() : undefined;

        if (!cleanEmail || !cleanPassword) {
            return res.status(400).json({ error: "MISSING_CREDENTIALS" });
        }

        const user = await User.findOne({ email: cleanEmail });

        if (!user) {
            return res.status(401).json({ error: "INVALID_CREDENTIALS" });
        }

        const isMatch = await bcrypt.compare(cleanPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "INVALID_CREDENTIALS" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "SERVER_ERROR" });
    }
});

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const cleanEmail = typeof email === "string" ? email.trim() : undefined;
    const cleanPassword = typeof password === "string" ? password.trim() : undefined;

    if (!cleanEmail || !cleanPassword) {
        return res.status(400).json({ error: "MISSING_CREDENTIALS" });
    }

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
        return res.status(409).json({ error: "USER_ALREADY_EXISTS" });
    }

    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const newUser = new User({
        email: cleanEmail,
        password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "User created successfully" });
});

module.exports = router;