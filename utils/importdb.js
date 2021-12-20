const fs= require('fs');
const path = require('path');
const initDb = require('../helpers/db')
const config = require('../configs/config');
const fctrl= require('../helpers/dbhelper');
const {pinataInit, pinataFile, pinataFolder}= require('../helpers/pinata');
const {ossFolder}= require('../helpers/oss');
const crypto = require('crypto')



//const svg = [{
//    name:"Chunky_body_v1.svg",
//    oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v1/Chunky_body_v1.svg",
//    ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v1/Chunky_body_v1.svg"
//},
//    {
//        name:"Chunky_hand_v1.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v1/Chunky_hand_v1.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v1/Chunky_hand_v1.svg"
//    },
//    {
//        name:"Chunky_head_v1.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v1/Chunky_head_v1.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v1/Chunky_head_v1.svg"
//    },
//    {
//        name:"Chunky_body_v2.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v2/Chunky_body_v2.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v2/Chunky_body_v2.svg"
//    },
//    {
//        name:"Chunky_hand_v2.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v2/Chunky_hand_v2.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v2/Chunky_hand_v2.svg"
//    },
//    {
//        name:"Chunky_head_v2.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v2/Chunky_head_v2.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v2/Chunky_head_v2.svg"
//    },
//    {
//        name:"Chunky_body_v3.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v3/Chunky_body_v3.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v3/Chunky_body_v3.svg"
//    },
//    {
//        name:"Chunky_hand_v3.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v3/Chunky_hand_v3.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v3/Chunky_hand_v3.svg"
//    },
//    {
//        name:"Chunky_head_v3.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v3/Chunky_head_v3.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v3/Chunky_head_v3.svg"
//    },
//    {
//        name:"Chunky_body_v4.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v4/Chunky_body_v4.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v4/Chunky_body_v4.svg"
//    },
//    {
//        name:"Chunky_hand_v4.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v4/Chunky_hand_v4.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v4/Chunky_hand_v4.svg"
//    },
//    {
//        name:"Chunky_head_v4.svg",
//        oss:"https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v4/Chunky_head_v4.svg",
//        ipfs:"ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v4/Chunky_head_v4.svg"
//    }]
//
//
//function sha1(msg) {
//    const shasum = crypto.createHash('sha1')
//    shasum.update(JSON.stringify(msg))
//    return shasum.digest('hex')
//}
//
//async function importdb() {
//    for (const i of svg) {
//        ipfsUrlHash =  sha1(i.ipfs)
//        const ret = await fctrl.add(i.name, 'svg', i.ipfs, ipfsUrlHash, i.oss, "oss", "NULL");
//        console.log(ret)
//    }
//}
//
//initDb().then(() => {
//    console.log("initDB success");
//    importdb();
//    console.log("done");
//});
async function upfolders(){
	
	let res = await pinataFolder("test", "../test");
	console.log(res)
}

async function upfile(){
	
	let res = await pinataFile({name: "test/6.txt",path: "../test/6.txt"});
	console.log(res)
}


async function upfileOSS(){
	
	let res = await ossFolder("../test");
	console.log(res)
}

//upfileOSS()
pinataInit().then(() => {
console.log("initPinata success");
upfolders()
})
//upfile()
