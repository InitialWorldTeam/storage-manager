const authenticate = require('../middlewares/authenticate.js');


function login (ctx, next) {
	authenticate(ctx, next);
}

module.exports = login;
