const {uploadFolder} = require('../controllers/handle_req')

async function upfolder (ctx, next) {
	await uploadFolder(ctx, next)
};

module.exports = upfolder;
