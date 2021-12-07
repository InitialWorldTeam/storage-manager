const router = require('koa-router')();
const url = require('./url');
const upload = require('./upload');
const config = require('../configs/config');

router.prefix(config.apiPrefix);

router.use('/urls', url.routes(), url.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());

module.exports = router;
