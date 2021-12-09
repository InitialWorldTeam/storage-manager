const {Schema, model} = require("mongoose")

const FileSchema = new Schema({
	name : {
		type: String,
		required: true
	},
	type : {
		type: String,
	},
    ipfs : {
        type: String,
    },
    oss : {
        type: String,
    }
}, { timestamps: true })

module.exports = model("Files", FileSchema)

