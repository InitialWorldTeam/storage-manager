const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
	region:	'ap-southeast-1',
	accessKeyId: process.env.awsAccessKeyId,
	secretAccessKey: process.env.awsAccessKeySec
});

const s3 = new AWS.S3();

exports.s3File = async function (file) {
	let params = {
		Bucket: 'noel-testing',
		Key : "test/"+path.basename(file), //TODO test?
		Body : fs.createReadStream(file),
	};

	console.log(process.env.awsAccessKeyId);
	console.log(process.env.awsAccessKeySec);
	//let result = await s3.listBuckets().promise();
	let result = await s3.upload(params).promise();
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

		let res = await s3.upload(params).promise()
		results.push({
			name: file.filename,
			folder: file.folder3,
			fname: file.folder,
			url:res.Location,
		})

	}

	return results
};
