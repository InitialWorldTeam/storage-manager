const router = require('koa-router')();
const {uploadFolder} = require('../controllers/handle_req')

router.post('/', async (ctx, next) => {
	await uploadFolder(ctx, next)
});

module.exports = router;
