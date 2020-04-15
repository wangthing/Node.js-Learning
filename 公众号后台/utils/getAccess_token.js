const conf = require('../config')  //个人的配置信息
const fs = require('fs')
const axios = require('axios')
const token = require('../token.json');

let getToken = async function getToken (tokenCache) {
    
    const APPID=conf.appid;
    const APPSECRET=conf.appsecret;

    const api=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
    const res = await axios.get(api);
    console.log(res.data);
    Object.assign(tokenCache, res.data, {
        updateTime: Date.now()
    });
    

    let now = Date.now();
    if(now - token.updateTime < 7200000) {
        console.log("还没有过期");
        return;
    }

    fs.readFile('./token.json', function (err, data) {
        if(err) {
            throw err;
        }
        fs.writeFile('./token.json', JSON.stringify(tokenCache), function (err) {
            console.log(err);
        })
    })
    
}

module.exports = {
    getToken,
}