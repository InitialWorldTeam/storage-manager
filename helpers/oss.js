const OSS = require('ali-oss');
const config = require('../configs/config');
const fs= require('fs');


const client = new OSS({
    region: config.aliRegion,
    accessKeyId: process.env.aliAccessKeyId,
    accessKeySecret: process.env.aliAccessKeySec,
	bucket: config.aliBucket
});

exports.ossFile = async function (file) {
	const stream = fs.createReadStream(file.path);
	let result = await client.putStream('test/'+file.name, stream);
	return result;
};
