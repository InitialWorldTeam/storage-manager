const {Schema, model} = require("mongoose")

const FileSchema = new Schema({
	name : {
		type: String,
		required: true
	},
    description: {
        type: String,
    },
	filetype : {
		type: String,
	},
    ipfs_idhash : {
        type: String,
		required: true,
		index: true,
		unique: true
    },
    ipfs_url : {
        type: String,
		required: true
    },
    external_url : {
        type: String,
    },
    external_type: {
        type: String,
    },
    local_url: {
        type: String,
    }
}, { timestamps: true })

module.exports = model("Files", FileSchema)

