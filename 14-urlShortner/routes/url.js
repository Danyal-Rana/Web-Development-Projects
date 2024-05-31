const express = require('express');
const { handleGenerateNewShorUrl } = require('../controllers/url');

const router = express.Router();

router.post("/", handleGenerateNewShorUrl);



module.exports = router;