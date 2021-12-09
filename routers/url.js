const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const https = require("https")
const superagent = require('superagent');
const fctrl= require('../helpers/dbhelper');
const { logger, accessLogger } = require('../utils/logger');

router.get('/:filename', async (ctx) => {
	try {
	const res = await fctrl.findByName(ctx.params.filename)
	console.log(res[0].oss)
	ctx.response.body = res[0].oss
	ctx.response.status = 200
	} catch (err) {
		logger.error(err);
		ctx.response.status = 401
	}
});

router.get('/', async (ctx) => {
  ctx.body = 'urls';
});
module.exports = router;
