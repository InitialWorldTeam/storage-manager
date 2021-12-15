const router = require('koa-router')();
const {queryUrl, queryUrlRpc} = require('../controllers/get_url')


router.post('/', async (ctx, next) => {
	console.log(ctx.request.body.ipfs_url)
	await queryUrlRpc(ctx, next);
});

router.get('/:ipfsid', async (ctx, next) => {
	await queryUrl(ctx, next);
});

router.get('/', async (ctx) => {
  ctx.body = 'urls';
});
module.exports = router;
