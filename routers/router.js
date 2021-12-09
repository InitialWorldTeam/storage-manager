const router = require('koa-router')();
const url = require('./url');
const upfile = require('./upfile');
const downfile = require('./downfile');
const config = require('../configs/config');

router.prefix(config.apiPrefix);

router.use('/urls', url.routes(), url.allowedMethods());
router.use('/files', upfile.routes(), upfile.allowedMethods());
router.use('/files', downfile.routes(), downfile.allowedMethods());

module.exports = router;
