const OSS = require('ali-oss');
const config = require('../configs/config');
const fs= require('fs');
const path= require('path');


const client = new OSS({
    region: config.aliRegion,
    accessKeyId: process.env.aliAccessKeyId,
    accessKeySecret: process.env.aliAccessKeySec,
	bucket: config.aliBucket,
	timeout: 300
});

exports.ossFile = async function (file) {
	const stream = fs.createReadStream(file.path);
	let result = await client.putStream('test/'+file.name, stream);
	return result;
};


function getAllFiles(dirPath, originalPath, originalPath2, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []
  originalPath = originalPath || path.resolve(dirPath, "..")
  originalPath2 = originalPath2 || path.resolve(dirPath, ".")

  folder = path.relative(originalPath, path.join(dirPath, "/"))

  //arrayOfFiles.push({
  //    path: folder.replace(/\\/g, "/"),
  //})

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
}
exports.ossFolder = async function (dirPath) {
    results = []
    files = getAllFiles(dirPath)
    for (const file of files) {
        const stream = fs.createReadStream(file.path);
        let res = await client.putStream(file.folder, stream);
        results.push({
            name: file.filename,
            folder: file.folder3,
			fname: file.folder,
            url:res.url,
        })
    }

    return results
};
