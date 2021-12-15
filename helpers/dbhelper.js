const Files = require("../models/file")
const fs = require("fs")
const path = require("path")

class FileController {
	async add(name, type, ipfs_url, ipfs_idhash, external_url, external_type, local_url) {
		let e = {
			name: name,
            description: "test",
			type: type,
			ipfs_url: ipfs_url,
			ipfs_idhash: ipfs_idhash,
            external_url: external_url,
            external_type: external_type,
            local_url: local_url
		}
		return await Files.create(e)
	}

	async find() {
		return await Files.find()
	}

	async findById(id) {
		return await Files.findById(id)
	}

	async findByIpfsID(id) {
		return await Files.find({ipfs_idhash: id})
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
