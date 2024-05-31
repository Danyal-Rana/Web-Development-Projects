const shortid = require('shortid');
const url = require('../models/url');

async function handleGenerateNewShorUrl (req, res) {

    const body = req.body;
    if (!body.url) {
        return res.status(400).json({error: 'URL is required.'});
    }

    const myShortId = shortid();

    await url.create({
        shortId: { name: myShortId },
        redirectURL: { name: body.url },
        visitHistory: []
    });

    return res.status(201).json({shortId: myShortId});
}

async function handleGetAnalytics (req, res) {
    const myShortId = req.params.shortId;

    const result = await url.findOne({'shortId.name': myShortId});
    
    if (!result) {
        return res.status(404).json({error: 'URL not found.'});
    }

    return res.json({totalClicks:result.visitHistory.length, analytics:result.visitHistory});
}

module.exports = {
    handleGenerateNewShorUrl,
    handleGetAnalytics,
}