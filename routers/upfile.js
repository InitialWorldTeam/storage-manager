const router = require('koa-router')();
const {uploadFile} = require('../controllers/handle_req')
const jwt = require('../middlewares/jwt');

router.post('/', jwt, async (ctx, next) => {
	await uploadFile(ctx, next)
});

module.exports = router;
