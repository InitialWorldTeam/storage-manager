const router = require('koa-router')();
const url = require('./url');
const upload = require('./upload');

router.prefix("/api/v1");

router.use('/urls', url.routes(), url.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());

module.exports = router;
