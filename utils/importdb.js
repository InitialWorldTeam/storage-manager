const fs= require('fs');
const path = require('path');
const initDb = require('../helpers/db')
const config = require('../configs/config');
const fctrl= require('../helpers/dbhelper');
const {pinataInit, pinataFile, pinataFolder}= require('../helpers/pinata');
const {ossFolder}= require('../helpers/oss');
const crypto = require('crypto')



const svg = [{
    name:"",
    oss:"",
    ipfs:""
    }]


function sha1(msg) {
    const shasum = crypto.createHash('sha1')
    shasum.update(JSON.stringify(msg))
    return shasum.digest('hex')
}

async function importdb() {
    for (const i of svg) {
        ipfsUrlHash =  sha1(i.ipfs)
        const ret = await fctrl.add(i.name, 'svg', i.ipfs, ipfsUrlHash, i.oss, "oss", "NULL");
        console.log(ret)
    }
}

initDb().then(() => {
    console.log("initDB success");
    importdb();
    console.log("done");
});
