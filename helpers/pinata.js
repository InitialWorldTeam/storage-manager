const fs = require('fs');
const path = require('path');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.pinataAPI, process.env.pinataSec);

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

	let res = await pinata.pinFileToIPFS(readableStreamForFile, options)
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

	let res = await pinata.pinFromFS(path, options);

	return res;
}


module.exports.pinataInit = pinataInit;
module.exports.pinataFile = pinataFile;
module.exports.pinataFolder = pinataFolder;
