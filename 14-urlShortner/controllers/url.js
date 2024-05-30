const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShorUrl (req, res) {

    const body = req.body;
    if (!body.URL) {
        return res.status(400).json({error: 'URL is required.'});
    }

    const myShortId = nanoid(5);

    await URL.create({
        shortId: myShortId,
        redirectURL: body.URL,
        visitHistory: []
    });

    return res.status(201).json({shortId: myShortId});
}

module.exports = {
    handleGenerateNewShorUrl,
}