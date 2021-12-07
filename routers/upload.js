const router = require('koa-router')();

router.post('/', async (ctx) => {
  ctx.body = 'upload done';
});

module.exports = router;
