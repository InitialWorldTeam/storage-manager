const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const https = require("https")
const superagent = require('superagent');

router.get('/:filename', async (ctx) => {
  //const fpath = path.join(__dirname, `/../public/1.png`);
  //ctx.response.body = fs.createReadStream(fpath);
  //ctx.response.type = path.extname(ctx.path);
  //ctx.response.status = 200;

    await (async () => {
  try {
    //const res = await superagent.get('https://www.google.com/images/srpr/logo11w.png');
    const res = await superagent.get('https://hatrabbits.com/wp-content/uploads/2018/10/risky-assumptions.jpg');
    console.log('Status Code:', res.statusCode);

    const png = res.body;
    ctx.response.body = res.body;
    ctx.response.status = 200;
    ctx.response.type = res.type;
    //ctx.response.type = '.png';
  } catch (err) {
    console.log(err.message);
  }
})();

  //var options = {
  //  url: 'https://www.google.com/images/srpr/logo11w.png',
  //  method: 'GET',
  //  encoding: null
  //};

  //console.log(options)
  //request(options, async (error, response, body) => {
  //  ctx.response.body = body;
  //  ctx.response.type = 'image/png';
  //  ctx.response.status = 200;
  //});

  //console.log(ctx.response.body)
//app.get("/google/logo", function(req, res) {
//res.writeHead(302, {location:"https://www.google.com/images/srpr/logo11w.png"});
//res.end();
//})
});

router.get('/', async (ctx) => {
  ctx.body = 'urls';
});
module.exports = router;
