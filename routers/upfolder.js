const router = require('koa-router')();
const {uploadFolder} = require('../controllers/handle_req')
const jwt = require('../middlewares/jwt');

router.post('/', jwt, async (ctx, next) => {
	await uploadFolder(ctx, next)
});

module.exports = router;
