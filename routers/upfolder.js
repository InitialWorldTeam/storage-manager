const router = require('koa-router')();
const {uploadFolder} = require('../controllers/get_url')

router.post('/', async (ctx, next) => {
	await uploadFolder(ctx, next)
});

module.exports = router;
