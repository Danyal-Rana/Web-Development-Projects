const express = require('express');
const { handleGenerateNewShorUrl, handleGetAnalytics } = require('../controllers/url');

const router = express.Router();

router.post("/", handleGenerateNewShorUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;