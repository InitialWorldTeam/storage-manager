const Files = require("../models/file")
const fs = require("fs")
const path = require("path")

class FileController {
	async add(name, type, ipfs_url, external_url, external_type) {
	//async add(name, signedhash, unsignedhash, path, tag) {
		let e = {
			name: name,
            description: "test",
			type: type,
			ipfs_url: ipfs_url,
            external_url: ext_url,
            external_type: ext_type,
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
