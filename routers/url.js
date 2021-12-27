const {queryUrl, queryUrlRpc} = require('../controllers/handle_req')


async function url (ctx, next) {
	console.log(ctx.request.body.ipfs_url)
	await queryUrlRpc(ctx, next);
};

module.exports = url;
