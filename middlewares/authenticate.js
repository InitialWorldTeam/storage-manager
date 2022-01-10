const jwt = require('jsonwebtoken');
const config = require('../config/index.js');

module.exports = function (ctx, next) {
	// should use sha1(jwtPass) to compare
	if (ctx.request.body.password === config.jwtPass) {
		ctx.response.status = 200;
		ctx.response.body = JSON.stringify({
			code: "0000",
			msg:"Successfully logged in",
			data: jwt.sign({ role: 'admin' }, config.jwtSec)
		});
	} else {
		ctx.response.status = ctx.status = 200;
		ctx.response.body = JSON.stringify({
			code: "0007",
			msg: "Authentication failed",
			data: {}
		});
	}
}
