const router = require('koa-router')();

router.get('/:filename', async (ctx) => {
  ctx.body = `url.filename: ${ctx.params.filename}`;
});

router.get('/', async (ctx) => {
  ctx.body = 'urls';
});
module.exports = router;
