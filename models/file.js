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
    ipfs_url : {
        type: String,
    },
    external_url : {
        type: String,
    },
    external_type: {
        type: String,
    }
}, { timestamps: true })

module.exports = model("Files", FileSchema)

