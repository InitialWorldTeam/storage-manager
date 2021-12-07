const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const http = require("http")

router.get('/:filename', async (ctx) => {
  //const fpath = path.join(__dirname, `/../public/1.png`);
  //ctx.response.body = fs.createReadStream(fpath);
  //ctx.response.type = path.extname(ctx.path);
  //ctx.response.status = 200;

http.get('http://www.baidu.com', (res) => {
  console.log(`Got response: ${res.statusCode}`);
  console.log(`Got response: ${res}`);
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
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
