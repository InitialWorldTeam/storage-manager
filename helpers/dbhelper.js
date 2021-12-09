const Files = require("../models/file")
const fs = require("fs")
const path = require("path")

class FileController {
	async add(name, type, oss) {
	//async add(name, signedhash, unsignedhash, path, tag) {
		let e = {
			name: name,
			type: type,
			oss: oss
		}
		return await Files.create(e)
	}

	async find() {
		return await Files.find()
	}

	async findById(id) {
		return await Files.findById(id)
	}

	async findByName(fn) {
		return await Files.find({name:fn})
	}

	async delete(id) {
		const result = await Files.findById(id)
		if (!result) {
			return  null
		}

		return await Files.findByIdAndDelete(id)
	}	
}

module.exports = new FileController()
