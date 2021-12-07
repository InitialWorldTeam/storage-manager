const ApiErrorCodes = require('./error_code');

const ApiErrorMap = new Map();

ApiErrorMap.set(ApiErrorCodes.NOT_FOUND, { code: ApiErrorCodes.NOT_FOUND, message: '未找到该接口' });
ApiErrorMap.set(ApiErrorCodes.UNKNOW_ERROR, { code: ApiErrorCodes.UNKNOW_ERROR, message: '未知错误' });
ApiErrorMap.set(ApiErrorCodes.LEGAL_ID, { code: ApiErrorCodes.LEGAL_ID, message: 'id 不合法' });
ApiErrorMap.set(ApiErrorCodes.UNEXIST_ID, { code: ApiErrorCodes.UNEXIST_ID, message: 'id 不存在' });
ApiErrorMap.set(ApiErrorCodes.LEGAL_FILE_TYPE, { code: ApiErrorCodes.LEGAL_FILE_TYPE, message: '文件类型不允许' });
ApiErrorMap.set(ApiErrorCodes.NO_AUTH, { code: ApiErrorCodes.NO_AUTH, message: '没有操作权限' });

module.exports = ApiErrorMap;
