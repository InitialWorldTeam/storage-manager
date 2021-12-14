const fs= require('fs');
const path = require('path');
const config = require('../configs/config');
const { logger, accessLogger } = require('../utils/logger');
const fctrl= require('../helpers/dbhelper');
const {pinataFile} = require('../helpers/pinata');
const OSS = require('ali-oss');


const client = new OSS({
    region: config.aliRegion,
    accessKeyId: process.env.aliAccessKeyId,
    accessKeySecret: process.env.aliAccessKeySec,
	bucket: config.aliBucket
});

module.exports = {
  uploadFile: async(ctx, next) => {
	const files = ctx.request.files;
	for(let key in files) {
		let file = files[key]
		const stream = fs.createReadStream(file.path);
		let result = await client.putStream('test/'+file.name, stream);
		const res = await pinataFile(file)
		const ret = await fctrl.add(file.name, file.type, `ipfs.io/ipfs/${res.IpfsHash}` ,result.url, "oss");
		console.log(ret)
	  }

	ctx.response.status = 200;
  },
  queryUrl: async(ctx, next) => {
	try {
	const res = await fctrl.findByName(ctx.params.filename)
	console.log(res[0].oss)
	ctx.response.body = res[0].oss
	ctx.response.status = 200
	} catch (err) {
		logger.error(err);
		ctx.response.status = 401
	}
  },
}

