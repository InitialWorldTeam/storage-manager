const router = require('koa-router')();
const url = require('./url');
const upfile = require('./upfile');
const upfolder= require('./upfolder');
//const downfile = require('./downfile');
const login = require('./login');
const config = require('../configs/config');

router.prefix(config.apiPrefix);

router.use('/urls', url.routes(), url.allowedMethods());
router.use('/files', upfile.routes(), upfile.allowedMethods());
router.use('/folder', upfolder.routes(), upfolder.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
//router.use('/files', downfile.routes(), downfile.allowedMethods());

module.exports = router;
