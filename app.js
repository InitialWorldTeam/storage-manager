const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const routers = require('./routers/router');
const { logger, accessLogger } = require('./utils/logger');
const responseFormatter = require('./middlewares/response');
const config = require('./configs/config');
const initDb = require('./helpers/db')
const koaStatic = require('koa-static')
const {pinataInit} = require('./helpers/pinata')




const app = new Koa();

app.use(koaStatic(
	path.join(__dirname, 'public')
))

app.use(koaBody({
  multipart: true,
  formidable: {
	uploadDir: path.join(__dirname, 'public/upload/'),
	keepExtensions: true,
	maxFieldsSize: 20 * 1024 * 1024,
	onFileBegin: (name, file) => {
		const dirName = name;
		const dir = path.join(__dirname, `public/upload/${dirName}`);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		file.path = `${dir}/${file.name}`

		onError: (error) => {
			app.status = 200;
			app.body = JSON.stringfy({code:"0001", msg:"upload failed", data:{}});
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
