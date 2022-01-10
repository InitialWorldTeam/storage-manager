const koaJwt = require('koa-jwt');
const config = require("../config/index.js");

module.exports = koaJwt({
	secret: config.jwtSec
});
