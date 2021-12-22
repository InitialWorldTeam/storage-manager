const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const config = require('../configs/config');

AWS.config.update({
	region:	config.s3Region,
	accessKeyId: config.s3AccessKeyId,
	secretAccessKey: config.s3AccessKeySec
});

const s3 = new AWS.S3();

exports.s3File = async function (file) {
	let params = {
		Bucket: config.s3Bucket,
		Key : config.s3Folder + '/' + path.basename(file),
		Body : fs.createReadStream(file),
	};

	let result = await s3.upload(params).promise().catch((err)=>{
		throw new Error(err)
	});
	return {url:result.Location};
};

function getAllFiles(dirPath, originalPath, originalPath2, arrayOfFiles) {
	files = fs.readdirSync(dirPath)

	arrayOfFiles = arrayOfFiles || []
	originalPath = originalPath || path.resolve(dirPath, "..")
	originalPath2 = originalPath2 || path.resolve(dirPath, ".")

	folder = path.relative(originalPath, path.join(dirPath, "/"))

	files.forEach(function (file) {
		if (fs.statSync(dirPath + "/" + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + "/" + file, originalPath, originalPath2, arrayOfFiles)
		} else {
			fpath = path.join(dirPath, "/", file)

			arrayOfFiles.push({
				folder: path.relative(originalPath, fpath).replace(/\\/g, "/"),
				folder2: folder,
				folder3: path.relative(originalPath2, fpath).replace(/\\/g, "/"),
				//content: fs.readFileSync(fpath),
				path: fpath,
				filename: file
			})
		}
	})

	return arrayOfFiles
};

exports.s3Folder = async function (dirPath) {
	results = []
	files = getAllFiles(dirPath)
	for (const file of files) {
		let params = {
			Bucket: 'noel-testing',
			Key : file.folder,
			Body : fs.createReadStream(file.path)
		};

		let res = await s3.upload(params).promise().catch((err)=>{
			throw new Error(err)
		});

		results.push({
			name: file.filename,
			folder: file.folder3,
			fname: file.folder,
			url:res.Location,
		})

	}

	return results
};
