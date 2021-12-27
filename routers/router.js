const router = require('koa-router')();
const config = require('../configs/config');
const url = require('./url');
const upfile = require('./upfile');
const upfolder= require('./upfolder');
const login = require('./login');
const jwt = require('../middlewares/jwt');

function emptyMiddleWare(ctx, next) {
	next();
};

const routers = [
	{
		path:   config.apiPrefix + '/login',
		method: 'post',
		middleware : emptyMiddleWare,
		action: login
	}, {
		path:   config.apiPrefix + '/files',
		method: 'post',
		middleware : jwt,
		action: upfile
	}, {
		path:   config.apiPrefix + '/folder',
		method: 'post',
		middleware: jwt,
		action: upfolder
	}, {
		path:   config.apiPrefix + '/urls',
		method: 'post',
		middleware : emptyMiddleWare,
		action: url
	}
];

module.exports = function() {
	for (let i in routers) {
		r = routers[i];
		router[r.method](r.path, r.middleware, r.action);
	}
	return router;
};
