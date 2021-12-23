const koaJwt = require('koa-jwt');
const config = require("../configs/config");

module.exports = koaJwt({
	secret: config.jwtSec
});
