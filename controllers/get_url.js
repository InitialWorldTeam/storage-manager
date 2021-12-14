const fs= require('fs');
const path = require('path');
const config = require('../configs/config');
const { logger, accessLogger } = require('../utils/logger');
const fctrl= require('../helpers/dbhelper');
const {pinataFile} = require('../helpers/pinata');
const OSS = require('ali-oss');


const client = new OSS({
    region: config.aliRegion,
    accessKeyId: config.aliAccessKeyId,
    accessKeySecret: config.aliAccessKeySec,
	bucket: config.aliBucket
});

module.exports = {
  uploadFile: async(ctx, next) => {
	console.log("hahahaha")
	const files = ctx.request.files;
	for(let key in files) {
		let file = files[key]
		console.log(file.name)
		console.log(file.type)
		const stream = fs.createReadStream(file.path);
		let result = await client.putStream('test/'+file.name, stream);
		console.log(result.name);
		//const ret = await fctrl.add(file.name, file.type, result.name);
		const ret = await fctrl.add(file.name, file.type, result.url);
		console.log(ret)

		const res2 = await pinataFile(file.path)
		console.log(res2)
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

