const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
	accessKeyId: process.env.awsAPI,
	secretAccessKey: process.env.awsSec"
});

const s3 = new AWS.S3();

exports.s3File = async function (file) {
	let params = {
		Bucket: 'test',
		Key : "test/"+path.basename(file) //TODO test?
		Body : fs.createReadStream(file),
	};

	let result = await s3.upload(params);
	return result;
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
		const stream = fs.createReadStream(file.path);

		let params = {
			Bucket: 'test',
			Key : file.folder+path.basename(file.filename)
			Body : fs.createReadStream(file),
		};

		let res = await s3.upload(params);
		results.push({
			name: file.filename,
			folder: file.folder3,
			fname: file.folder,
			url:res.url,
		})
	}

	return results
};
