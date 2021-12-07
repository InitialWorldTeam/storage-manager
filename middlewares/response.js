const ApiError = require('../errors/api_error');
const ApiErrorCodes = require('../errors/error_code');

const responseFormatter = (apiPrefix) => async (ctx, next) => {
  if (ctx.request.path.startsWith(apiPrefix)) {
    try {
      await next();

      if (ctx.response.status === 404) {
        throw new ApiError(ApiErrorCodes.NOT_FOUND);
      } else {
        ctx.body = {
          code: 'success',
          message: '成功!',
          result: ctx.body,
        };
      }
    } catch (error) {
      if (error instanceof ApiError) {
        ctx.body = {
          code: error.code,
          message: error.message,
        };
      } else {
        ctx.status = 400;
        ctx.response.body = {
          code: error.name,
          message: error.message,
        };
      }
    }
  } else {
    await next();
  }
};

module.exports = responseFormatter;
