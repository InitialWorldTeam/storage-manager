const ApiErrorMap = require('./error_map');

class ApiError extends Error {
  constructor(errorCode, errorMsg) {
    super();

    let errorInfo = {};
    if (errorMsg) {
      errorInfo = {
        code: errorCode,
        message: errorMsg,
      };
    } else {
      errorInfo = ApiErrorMap.get(errorCode);
    }

    this.name = errorCode;
    this.code = errorInfo.code;
    this.message = errorInfo.message;
  }
}

module.exports = ApiError;
