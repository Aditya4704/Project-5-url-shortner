const URL = require('../models/url')
const shortid = require('shortid');

async function handleGenerateNewShortURL(req , res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({msg : "not valid url"});
    const shortId = shortid.generate();
    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        visitHistory : []
    })
    return res.json({shortURL : shortId})
}

async function handleGetRequest(req , res) {
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate({
        shortId
    } , {
        $push : {
            visitHistory : {timeStamp : Date.now()}
        }
    })
    return res.redirect(entry.redirectURL);
}
async function handleGetAnalytics(req , res) {
    const id = req.params.id;
    const entry = await URL.findOne({shortId : id})
    return res.json({
        totalClicks : entry.visitHistory.length,
        analytics : entry.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetRequest,
    handleGetAnalytics
}