var express = require('express');
var jwt = require('jsonwebtoken');
var sLinkCtrl = require('../controllers/shortlink.controller');

var router = express.Router();

//------------------------------- ShortLinks Routes---------------------------------
router.get('/shortlinks',  sLinkCtrl.getShortLinks);
router.post('/shortlinks',  sLinkCtrl.addShortLinks);
router.patch('/shortlinks/:slug', sLinkCtrl.updateShortLinks);


module.exports = router;
