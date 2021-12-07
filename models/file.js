const {Schema, model} = require("mongoose")

const FileSchema = new Schema({
	name : {
		type: String,
		required: true
	},
    ipfs : {
        type: string,
    }
    s3 : {
        type:string,
    }
}, { timestamps: true })

module.exports = model("Files", FileSchema)

