const router = require('koa-router')();
const authenticate = require('../middlewares/authenticate.js');

router.post('/', (ctx, next) => {
  authenticate(ctx, next);
});

module.exports = router;
