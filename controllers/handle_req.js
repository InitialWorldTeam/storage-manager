const fs= require('fs');
const path = require('path');
const config = require('../configs/config');
const { logger, accessLogger } = require('../utils/logger');
const fctrl= require('../helpers/dbhelper');
const {pinataFile, pinataFolder} = require('../helpers/pinata');
const {ossFile, ossFolder} = require('../helpers/oss');
const {s3File, s3Folder} = require('../helpers/s3');
const crypto = require('crypto')

function sha1(msg) {
	const shasum = crypto.createHash('sha1')
	shasum.update(JSON.stringify(msg))
	return shasum.digest('hex')
}

module.exports = {
	uploadFile: async(ctx, next) => {
		let isError = false;
		const files = ctx.request.files;
		for(let key in files) {
			let file = files[key]
			const res = await pinataFile(file).catch((err)=>{
				isError = true;
			})

			if (isError == true) {
				ctx.response.body = JSON.stringify({
					code: '0002',
					msg: "pin file to ipfs error",
					data: {}
				});
				ctx.response.status = 200;
				return
			}

			ipfsUrlHash = sha1(`ipfs://ipfs/${res.IpfsHash}`)

			//const res2 = await ossFile(file).catch((err)=>{
			//    isError = true;
			//})
			const res2 = await s3File(file.path).catch((err)=>{
				isError = true;
			})

			if (isError == true) {
				ctx.response.body = JSON.stringify({
					code: '0003',
					msg: "pin file to file store error",
					data: {}
				});
				ctx.response.status = 200;
				return
			}

			const res3 = await fctrl.findByIpfsID(ipfsUrlHash)
			if(res3.length == 0){
				const ret = await fctrl.add(file.name, file.type, `ipfs://ipfs/${res.IpfsHash}` ,ipfsUrlHash, res2.url, "oss", '/upload/' + path.basename(file.path)).catch((err)=>{
					isError = true;
				});
				if (isError == true) {
					ctx.response.body = JSON.stringify({
						code: '0004',
						msg: "pin index to db error",
						data: {}
					});
					ctx.response.status = 200;
					return
				}
			}
			ctx.response.body = JSON.stringify({
				code: '0000',
				msg: "success",
				data: {
					name: file.name,
					ifps_url: `ipfs://ipfs/${res.IpfsHash}`,
					external_url: res2.url,
					local_url: '/upload/' + path.basename(file.path)
				}
			});
			ctx.response.status = 200;

			break;
		}
	},
	queryUrl: async(ctx, next) => {
		try {
			ipfsUrlHash = sha1(ctx.params.ipfsid)
			const res = await fctrl.findByIpfsID(ipfsUrlHash)
			ctx.response.body = JSON.stringify({
				code: '0000',
				msg: "success",
				data: {
					external_url: res[0].external_url,
					local_url: res[0].local_url
				}
			})
			ctx.response.status = 200
		} catch (err) {
			logger.error(err);
			ctx.response.body = JSON.stringify({
				code: '0005',
				msg: "not found",
				data: {}
			})
			ctx.response.status = 200
		}
	},

	queryUrlRpc: async(ctx, next) => {
		try {
			ipfsUrlHash = sha1(ctx.request.body.ipfs_url)
			const res = await fctrl.findByIpfsID(ipfsUrlHash)
			if(res.length == 0){
				ctx.response.body = JSON.stringify({
					code: '0005',
					msg: "not found",
					data: {
					}
				})
				ctx.response.status = 200
			} else {
				ctx.response.body = JSON.stringify({
					code: '0000',
					msg: "success",
					data: {
						external_url: res[0].external_url,
						local_url: res[0].local_url
					}
				})
				ctx.response.status = 200
			}
		} catch (err) {
			logger.error(err);
			ctx.response.body = JSON.stringify({
				code: '0006',
				msg: "interal error",
				data: {}
			})
			ctx.response.status = 200
		}
	},

	uploadFolder: async(ctx, next) => {
		let isError = false;
		let fpath = path.join(__dirname, `../public/upload/${ctx.header.folder}`)

		//let files = await ossFolder(fpath).catch((err)=>{
		//    isError = true;
		//};
		let files = await s3Folder(fpath).catch((err)=>{
			isError = true;
		})

		if (isError == true) {
			ctx.response.body = JSON.stringify({
				code: '0003',
				msg: "pin file to file store error",
				data: {}
			});
			ctx.response.status = 200;
			return
		}

		let res = await pinataFolder(ctx.header.folder,fpath).catch((err)=>{
			console.log(err)
			isError = true;
		})

		if (isError == true) {
			ctx.response.body = JSON.stringify({
				code: '0002',
				msg: "pin file to ipfs error",
				data: {}
			});
			ctx.response.status = 200;
			return
		}

		let results = []
		for (file of files) {
			let ipfsurl = `ipfs://ipfs/${res.IpfsHash}/${file.folder}`
			ipfsUrlHash = sha1(ipfsurl)
			const ret = await fctrl.add(file.name, "NULL", ipfsurl, ipfsUrlHash, file.url, "NULL", `upload/${file.fname}`).catch((err)=>{
				isError = true;
			});
			if (isError == true) {
				ctx.response.body = JSON.stringify({
					code: '0004',
					msg: "pin index to db error",
					data: {}
				});
				ctx.response.status = 200;
				return
			}


			results.push({
				name: file.name,
				ifps_url: ipfsurl,
				external_url: file.url,
				local_url: `upload/${file.fname}`
			})
		}

		ctx.response.body = JSON.stringify({
			code: '0000',
			msg: "success",
			data: results
		});
		ctx.response.status = 200;
	},
}

