require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error("DB error:", err));

app.use(cors());

app.use(express.json());

const humanizeRoute = require('./routes/humanize');
const summarizeRoute = require('./routes/summarize');

app.use("/summarize", summarizeRoute);

app.use("/humanize", humanizeRoute);  

app.use("/auth", authRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
