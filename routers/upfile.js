const router = require('koa-router')();
const {uploadFile} = require('../controllers/get_url')

router.post('/', async (ctx, next) => {
	await uploadFile(ctx, next)
});

module.exports = router;
