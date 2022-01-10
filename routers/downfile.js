const router = require('koa-router')();
const config = require('../config/index.js');
const fs= require('fs');
const OSS = require('ali-oss');
const { logger, accessLogger } = require('../helpers/logger');


const client = new OSS({
    region: config.aliRegion,
    accessKeyId: config.aliAccessKeyId,
    accessKeySecret: config.aliAccessKeySec,
	bucket: config.aliBucket
});

router.get('/:filename', async (ctx) => {
  try {
      let result = await client.get('test/'+ctx.params.filename);
      ctx.response.type = result.res.headers['content-type'];
	  ctx.response.body = result.content;
	  ctx.response.status = 200;
    } catch (err) {
	  logger.error(err);
	  ctx.response.status = 201;
	  }
});

module.exports = router;
