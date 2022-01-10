const fs= require('fs');
const path = require('path');
const config = require('../config/index.js');
const { logger, accessLogger } = require('../helpers/logger');
const fctrl= require('../helpers/dbhelper');
const {pinataFile, pinataFolder} = require('../helpers/pinata');
//const {ossFile, ossFolder} = require('../helpers/oss');
const {s3File, s3Folder} = require('../helpers/s3');
const crypto = require('crypto')
const del = require('del');

function sha1(msg) {
	const shasum = crypto.createHash('sha1')
	shasum.update(JSON.stringify(msg))
	return shasum.digest('hex')
}

module.exports = {
	uploadFile: async(ctx, next) => {
		let isError = false;
		const files = ctx.request.files;
		for(let key in files) { //why loop??
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

			let ipfsUrl = `ipfs://ipfs/${res.IpfsHash}`
			ipfsUrlHash = sha1(ipfsUrl)

			const res3 = await fctrl.findByIpfsID(ipfsUrlHash)
			if(res3.length != 0){
				ctx.response.body = JSON.stringify({
					code: '0000',
					msg: "success",
					data: {
						name: res3[0].name,
						ifps_url: res3[0].ipfs_url,
						external_url: res3[0].external_url,
						local_url: res3[0].local_url 
					}
				})
				ctx.response.status = 200
				return;
			}

			//const res2 = await ossFile(res.IpfsHash, file).catch((err)=>{
			//    isError = true;
			//})
			const res2 = await s3File(res.IpfsHash, file.path).catch((err)=>{
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

			let localNewDir = path.join(__dirname, `../public/upload/${res.IpfsHash}`)

			if (!fs.existsSync(localNewDir)) {
				fs.mkdirSync(localNewDir, { recursive: true });
			}

			fs.renameSync(file.path, `${localNewDir}/${path.basename(file.path)}`);
	
			let localUrl = `/upload/${res.IpfsHash}/` + path.basename(file.path);
			const ret = await fctrl.add(file.name, file.type, ipfsUrl,ipfsUrlHash, res2.url, "NULL", localUrl).catch((err)=>{
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
			ctx.response.body = JSON.stringify({
				code: '0000',
				msg: "success",
				data: {
					name: file.name,
					ifps_url: ipfsUrl,
					external_url: res2.url,
					local_url: localUrl
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


		//let files = await ossFolder(res.IpfsHash, fpath).catch((err)=>{
		//    isError = true;
		//};
		let files = await s3Folder(res.IpfsHash, fpath).catch((err)=>{
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

		localNewDir = path.join(__dirname, `../public/upload/${res.IpfsHash}`)

		if (fs.existsSync(localNewDir)) {
            await del(localNewDir);
		}

		fs.renameSync(fpath, localNewDir)

		let results = []
		for (file of files) {
			let ipfsUrl = `ipfs://ipfs/${res.IpfsHash}/${file.folder}`
			ipfsUrlHash = sha1(ipfsUrl)


			const res3 = await fctrl.findByIpfsID(ipfsUrlHash)
			if(res3.length != 0){
				results.push({
					name: res3[0].name,
					ifps_url: res3[0].ipfs_url,
					external_url: res3[0].external_url,
					local_url: res3[0].local_url
				})
				continue;
			}

			let localUrl = `upload/${res.IpfsHash}/${file.folder}`
			const ret = await fctrl.add(file.name, "NULL", ipfsUrl, ipfsUrlHash, file.url, "NULL", localUrl).catch((err)=>{
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
				ifps_url: ipfsUrl,
				external_url: file.url,
				local_url: localUrl
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

