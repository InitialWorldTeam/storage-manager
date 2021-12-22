const router = require('koa-router')();
const {uploadFile} = require('../controllers/handle_req')

router.post('/', async (ctx, next) => {
	await uploadFile(ctx, next)
});

module.exports = router;
