const fs = require('fs')
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('e504c8c11bb2a1b91574', '0cfc8c7ff69e930770a04c0b0bb88ed964c862b94fc2fe178e35f441375b7120');

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

async function pinataFile(path) {
	const readableStreamForFile = fs.createReadStream(path);

	const options = {
		pinataMetadata: {
			name: "TODO",
		},
		pinataOptions: {
			cidVersion: 1
		}
	};

	let res = await pinata.pinFileToIPFS(readableStreamForFile, options)
	console.log(res)
}

module.exports.pinataInit = pinataInit;
module.exports.pinataFile = pinataFile;
