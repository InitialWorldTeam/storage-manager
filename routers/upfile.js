const {uploadFile} = require('../controllers/handle_req')

async function upfile (ctx, next) {
	await uploadFile(ctx, next);
};

module.exports = upfile;
