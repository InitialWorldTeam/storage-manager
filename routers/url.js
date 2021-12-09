const router = require('koa-router')();
const {queryUrl} = require('../controllers/get_url')

router.get('/:filename', async (ctx, next) => {
	await queryUrl(ctx, next);
});

router.get('/', async (ctx) => {
  ctx.body = 'urls';
});
module.exports = router;
