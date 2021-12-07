const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const routers = require('./routers/router');
const { logger, accessLogger } = require('./utils/logger');
const responseFormatter = require('./middlewares/response');
const config = require('./configs/config');
const initDb = require('./helpers/db')


const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload/'),
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    onFileBegin: (name, file) => {
      console.log(`name: ${name}`);
      console.log(file);
    },
  },
}));

app.use(json());

app.use(accessLogger());

app.on('error', err => {
  logger.error(err);
});

//app.use(responseFormatter(config.apiPrefix));

app.use(routers.routes()).use(routers.allowedMethods());

initDb().then(() => {
	app.listen(config.port, () => {
		console.log(`app started at port ${config.port}...`);
	});
});
