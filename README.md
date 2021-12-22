# storage-manager


## get url of NFT

request:
```
POST /api/v1/urls
{
    "ipfs_url": "ipfs://ipfs/Qmax4X3v382ZsWY6msE7vcnRw351BKMo5uZ8G8oBBQBDKT/v4/Chunky_head_v4.svg"
}

```

response:
```
{
    "code": "0000",
    "msg": "success",
    "data": {
        "external_url": "https://noel-test.oss-cn-beijing.aliyuncs.com/chunky/v4/Chunky_head_v4.svg",
        "local_url": "NULL"
    }
}
```

## error code

```
{code:'0000', msg: "success", data: {} }
{code:'0001', msg:"upload failed", data:{}}
{code:'0002', msg: "pin file to ipfs error", data: {} }
{code:'0003', msg: "pin file to file store error", data: {} }
{code:'0004', msg: "pin index to db error", data: {} }
{code:'0005', msg: "file is not existed", data: {} }
{code:'0006', msg: "interal error", data: {} }
```
