const File = require('../models/file.js')

module.exports = {
  add: async(ctx, next) => {
      return await Image.create({name: 1})
  },
  query: async(ctx, next) => {
    ctx.body = `2`
  },
  : async(ctx, next) => {
    ctx.body = `3`
  }
}

