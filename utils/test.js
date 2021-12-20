const fs = require("fs")
const path = require("path")

function getAllFiles(dirPath, originalPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []
  originalPath = originalPath || path.resolve(dirPath, "..")

  folder = path.relative(originalPath, path.join(dirPath, "/"))

  //arrayOfFiles.push({
  //    path: folder.replace(/\\/g, "/"),
  //})

  files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "/" + file, originalPath, arrayOfFiles)
      } else {
          fpath = path.join(dirPath, "/", file)

          arrayOfFiles.push({
              //folder: path.relative(originalPath, fpath).replace(/\\/g, "/"),
              folder: folder,
              //content: fs.readFileSync(fpath),
              path: fpath,
              filename: file
          })
      }
  })

  return arrayOfFiles
}

//console.log(getAllFiles("../test"))
files = getAllFiles("../test")
files.forEach((file) =>{
    console.log(file.path, file.filename, file.folder)
})

