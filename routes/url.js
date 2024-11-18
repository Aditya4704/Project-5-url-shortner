const express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL , handleGetRequest , handleGetAnalytics} = require('../controllers/url');

router.post("/" , handleGenerateNewShortURL );
router.get("/:id" , handleGetRequest )
router.get('/analytics/:id' , handleGetAnalytics)
module.exports = router;