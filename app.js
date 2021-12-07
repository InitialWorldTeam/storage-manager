const Koa = require('koa');
const path = require('path');
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const json = require('koa-json');
const logger = require('koa-logger');
const routers = require('./routers/router')

const app = new Koa();

onerror(app);

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

app.use(logger());

// routers
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000, () => {
    console.log("app started at port 3000...");
});
