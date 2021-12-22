module.exports = {
  port: process.env.PORT || 3000,
  apiPrefix: '/api/v1',
  database: 'mongodb://localhost:27017/test',
  databasePro: 'mongodb://root:123456@110.110.110.110:27017/pro',
  pinataAPI: process.env.pinataAPI ,
  pinataSec: process.env.pinataSec ,
  aliRegion: process.env.aliRegion ,
  aliBucket: process.env.aliBucket ,
  aliFolder: process.env.aliFolder ,
  aliAccessKeyId: process.env.aliAccessKeyId,
  aliAccessKeySec: process.env.aliAccessKeySec,
  s3Region: process.env.s3Region,
  s3Bucket: process.env.s3Bucket,
  s3Folder: process.env.s3Folder,
  s3AccessKeyId: process.env.s3AccessKeyId,
  s3AccessKeySec: process.env.s3AccessKeySec
};
