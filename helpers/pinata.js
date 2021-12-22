const fs = require('fs');
const path = require('path');
const config = require('../configs/config');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(config.pinataAPI, config.pinataSec);

function pinataInit() {
	return new Promise((resolve, reject) => {
		pinata.testAuthentication().then((res)=>{
			console.log(res);
			resolve(res);
		}).catch((err) =>{
			console.log(err);
			reject(err);
		})
	})
}

async function pinataFile(file) {
	const readableStreamForFile = fs.createReadStream(file.path);

	const options = {
		pinataMetadata: {
			name: file.name,
		},
		pinataOptions: {
			cidVersion: 1
		}
	};

	let res = await pinata.pinFileToIPFS(readableStreamForFile, options).catch((err)=>{
		throw new Error(err);
	})
    return res;
}

async function pinataFolder(dirname, path) {
	const options = {
		pinataMetadata: {
			name: dirname,
		},
		pinataOptions: {
			cidVersion: 1
		}
	};

	let res = await pinata.pinFromFS(path, options).catch((err)=>{
		throw new Error(err);
	});

	return res;
}


module.exports.pinataInit = pinataInit;
module.exports.pinataFile = pinataFile;
module.exports.pinataFolder = pinataFolder;
