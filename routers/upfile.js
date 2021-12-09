const router = require('koa-router')();
const config = require('../configs/config');
const fs= require('fs');
const fctrl= require('../helpers/dbhelper');
const OSS = require('ali-oss');


const client = new OSS({
    region: config.aliRegion,
    accessKeyId: config.aliAccessKeyId,
    accessKeySecret: config.aliAccessKeySec,
	bucket: config.aliBucket
});

router.post('/', async (ctx) => {
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
	  }
	ctx.response.status = 200;
});

module.exports = router;
