const router = require('koa-router')();
const {queryUrl} = require('../controllers/get_url')

router.get('/:ipfsid', async (ctx, next) => {
	//ctx.params.ipfsid='ipfs.io/ipfs/bafybeigiuxmrirndu3but7s6im6z2niixmmdm5qdsbpwdzs3g4q22pk4si'
	await queryUrl(ctx, next);
});

router.get('/', async (ctx) => {
  ctx.body = 'urls';
});
module.exports = router;
