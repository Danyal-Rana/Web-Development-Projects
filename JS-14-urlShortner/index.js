const express = require('express');
const urlRoute = require('./routes/url')
const {connectToMongoDB} = require('./connect')
const URL = require('./models/url')

const app = express();
const PORT = 5000;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then ( ()=> console.log("MongoDB is connected.") );

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const url = await URL.findOne({'shortId.name': shortId});

    if (!url) {
        return res.status(404).json({error: 'URL not found.'});
    }

    await URL.updateOne({'shortId.name': shortId}, {
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    });

    return res.redirect(url.redirectURL.name);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));