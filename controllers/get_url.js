const fs= require('fs');
const path = require('path');
const config = require('../configs/config');
const { logger, accessLogger } = require('../utils/logger');
const fctrl= require('../helpers/dbhelper');
const {pinataFile, pinataFolder} = require('../helpers/pinata');
const {ossFile, ossFolder} = require('../helpers/oss');
const crypto = require('crypto')

function sha1(msg) {
    const shasum = crypto.createHash('sha1')
    shasum.update(JSON.stringify(msg))
    return shasum.digest('hex')
}

module.exports = {
    uploadFile: async(ctx, next) => {
        const files = ctx.request.files;
        for(let key in files) {
            let file = files[key]
            const res = await pinataFile(file)
            ipfsUrlHash = sha1(`ipfs://ipfs/${res.IpfsHash}`)
            const res2 = await ossFile(file)
            const ret = await fctrl.add(file.name, file.type, `ipfs://ipfs/${res.IpfsHash}` ,ipfsUrlHash, res2.url, "oss", '/upload/' + path.basename(file.path));
            ctx.response.body = JSON.stringify({
                code: '0000',
                msg: "success",
                data: {
                    name: file.name,
                    ifps_url: `ipfs://ipfs/${res.IpfsHash}`,
                    external_url: res2.url,
                    local_url: '/upload/' + path.basename(file.path)
                }
            });
            ctx.response.status = 200;

            break;
        }
    },
    queryUrl: async(ctx, next) => {
        try {
            ipfsUrlHash = sha1(ctx.params.ipfsid)
            const res = await fctrl.findByIpfsID(ipfsUrlHash)
            ctx.response.body = JSON.stringify({
                code: '0000',
                msg: "success",
                data: {
                    external_url: res[0].external_url,
                    local_url: res[0].local_url
                }
            })
            ctx.response.status = 200
        } catch (err) {
            logger.error(err);
            ctx.response.status = 401
        }
    },

    queryUrlRpc: async(ctx, next) => {
        try {
            ipfsUrlHash = sha1(ctx.request.body.ipfs_url)
            const res = await fctrl.findByIpfsID(ipfsUrlHash)
            //ctx.response.body = JSON.stringify(res[0])
            ctx.response.body = JSON.stringify({
                code: '0000',
                msg: "success",
                data: {
                    external_url: res[0].external_url,
                    local_url: res[0].local_url
                }
            })
            ctx.response.status = 200
        } catch (err) {
            logger.error(err);
            ctx.response.status = 401
        }
    },

    uploadFolder: async(ctx, next) => {
        let fpath = path.join(__dirname, `../public/upload/${ctx.header.folder}`)

        let files = await ossFolder(fpath);
        let res = await pinataFolder(ctx.header.folder,fpath);
        let results = []
        for (file of files) {
            let ipfsurl = `ipfs://ipfs/${res.IpfsHash}/${file.folder}`
            ipfsUrlHash = sha1(ipfsurl)
            const ret = await fctrl.add(file.name, "NULL", ipfsurl, ipfsUrlHash, file.url, "NULL", `upload/${file.fname}`);

            results.push({
                name: file.name,
                ifps_url: ipfsurl,
                external_url: file.url,
                local_url: `upload/${file.fname}`
            })
        }

            ctx.response.body = JSON.stringify({
                code: '0000',
                msg: "success",
                data: results
            });
            ctx.response.status = 200;
    },
}

