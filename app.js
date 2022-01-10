const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const routers = require('./routers/router');
const { logger, accessLogger } = require('./helpers/logger');
const responseFormatter = require('./middlewares/response');
const config = require('./config/index.js');
const initDb = require('./helpers/db')
const koaStatic = require('koa-static')
const {pinataInit} = require('./helpers/pinata')
const cors = require('koa2-cors')




const app = new Koa();
app.use(cors({
	origin: function (ctx) {
		return ctx.header.origin;
	},
	maxAge: 0,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
	allowHeaders: ['Cookie', 'Origin', 'X-Requested-With', 'Content-Type',
		'i-msg-type', 'Accept', 'X-Auth-Token', 'X-Auth-DEVICE',
		'Authorization', 'x-requested-with', 'cache-control', 'X-Requested-With',
		'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials']

}))

app.use(koaStatic(
	path.join(__dirname, 'public')
))

app.use(koaBody({
  multipart: true,
  formLimit:"1000mb",
  jsonLimit:"1000mb",
  testLimit:"1000mb",
  formidable: {
	uploadDir: path.join(__dirname, 'public/upload/'),
	keepExtensions: true,
	maxFields: 1024*1024*1024,
	maxFieldsSize: 2000 * 1024 * 1024,
	onFileBegin: (name, file) => {
		const dirName = name;
		const dir = path.join(__dirname, `public/upload/${dirName}`);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		file.path = `${dir}/${file.name}`

		onError: (error) => {
			app.status = 200;
			app.body = JSON.stringify({code:"0001", msg:"upload failed", data:{}});
			return;
		}
	},
  },
}));

app.use(json());

app.use(accessLogger());

app.on('error', err => {
  logger.error(err);
});


app.use(routers.routes()).use(routers.allowedMethods());

pinataInit().then(() => {
console.log("initPinata success");
initDb().then(() => {
	console.log("initDB success");
	app.listen(config.port, () => {
		console.log(`app started at port ${config.port}...`);
	});
})});
