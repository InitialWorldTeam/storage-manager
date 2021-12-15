const fs= require('fs');
const path = require('path');
const config = require('../configs/config');
const { logger, accessLogger } = require('../utils/logger');
const fctrl= require('../helpers/dbhelper');
const {pinataFile} = require('../helpers/pinata');
const {ossFile} = require('../helpers/oss');
const crypto = require('crypto')

function sha1(msg) {
	const shasum = crypto.createHash('sha1')
	shasum.update(JSON.stringify(msg))
	return shasum.digest('hex') 
}

module.exports = {
	uploadFile: async(ctx, next) => {
		const files = ctx.request.files;
		for(let key in files) {
			let file = files[key]
			let fname = file.name
			const res = await pinataFile(file)
			ipfsUrlHash = sha1(`ipfs://ipfs/${res.IpfsHash}`)
			console.log(ipfsUrlHash)
			const res2 = await ossFile(file)
			const ret = await fctrl.add(file.name, file.type, `ipfs.io/ipfs/${res.IpfsHash}` ,ipfsUrlHash, res2.url, "oss");
			console.log(ret)
		ctx.response.body = JSON.stringify({
			//name: fname,
			ifps_url: `ipfs.io/ipfs/${res.IpfsHash}`,
			external_url: res2.url,
			local_url: ''
		});
		ctx.response.status = 200;

			break;
		}
	},
	queryUrl: async(ctx, next) => {
		try {
			ipfsUrlHash = sha1(ctx.params.ipfsid)
			console.log(ipfsUrlHash)
			const res = await fctrl.findByIpfsID(ipfsUrlHash)
			console.log(res)
			ctx.response.body = JSON.stringify(res[0])
			ctx.response.status = 200
		} catch (err) {
			logger.error(err);
			ctx.response.status = 401
		}
	},

	queryUrlRpc: async(ctx, next) => {
		try {
			ipfsUrlHash = sha1(ctx.request.body.ipfs_url)
			console.log(ipfsUrlHash)
			const res = await fctrl.findByIpfsID(ipfsUrlHash)
			console.log(res)
			ctx.response.body = JSON.stringify(res[0])
			ctx.response.status = 200
		} catch (err) {
			logger.error(err);
			ctx.response.status = 401
		}
	},
}

