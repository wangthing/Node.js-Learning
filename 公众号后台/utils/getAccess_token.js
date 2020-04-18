const conf = require('../config')  //个人的配置信息
const fs = require('fs')
const axios = require('axios')
const token = require('../token.json');
var querystring = require('querystring');

const APPID=conf.appid;
const APPSECRET=conf.appsecret;

let getToken = async function getToken (tokenCache) {
    
    const api=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
    const res = await axios.get(api);
    
    Object.assign(tokenCache, res.data, {
        updateTime: Date.now()
    });
    
    let now = Date.now();
    console.log(now - token.updateTime)
    if((now - token.updateTime) < 720000) {
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
//创建自定义菜单
let createMenus = function () {
    const api =  `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token.access_token}`;
    
    axios.post(api,{menu: conf.menu})
        .then((res) => {
            console.log("创建自定义菜单成功！")
            
        })
}
//查询自定义菜单

let getMenus = function () {
    const api = `https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${token.access_token}`
    axios.get(api).then(res => {
        console.log("获取自定义菜单·成功");
        console.log(res.data)
    })
}

//获取用户列表
let getUserLists = function () {
    const api = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${token.access_token}`

    axios.get(api)
        .then(res => {
            console.log("获取用户列表成功");
            console.log(res.data);
            getUserInfo(res.data.data.openid[0]);
        })
        .catch(err => {
            console.log(err.toString());
        })
}

function getUserInfo (openid) {
    const api = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token.access_token}&openid=${openid}`
    axios.get(api)
    .then(res => {
        console.log("获取用户信息成功");
        console.log(res.data);
        
    })
    .catch(err => {
        console.log(err.toString());
    })
}

module.exports = {
    getToken,
    createMenus,
    getMenus,
    getUserLists
}