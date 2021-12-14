const router = require('koa-router')();
const config = require('../configs/config');
const fs= require('fs');
const OSS = require('ali-oss');
const { logger, accessLogger } = require('../utils/logger');


const client = new OSS({
    region: config.aliRegion,
    accessKeyId: process.env.aliAccessKeyId,
    accessKeySecret: process.env.aliAccessKeySec,
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
