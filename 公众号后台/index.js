// index.js
const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static') 
const xml2js = require('xml2js') // xml转化为json
const app = new Koa()
const url = require('url')
const conf = require('./config')  //个人的配置信息
const crypto = require('crypto') // 加密模块
const xmlParser = require('koa-xml-body') //解析xml数据
const axios = require('axios')

const utils = require('./utils/getAccess_token')

app.use(xmlParser())
const router = new Router()
app.use(static(__dirname + '/'))

let tokenCache = {};

// 验证消息
router.get('/wechat', ctx => {

    console.log('校验url', ctx.url) 
    const {query} = url.parse(ctx.url, true)
    const {
            signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
            timestamp, // 时间戳
            nonce, // 随机数
            echostr // 随机字符串
    } = query
    console.log('wechat', query)

    // 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密
    let str = [conf.token, timestamp, nonce].sort().join('');
    console.log('str',str)
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex');
        console.log(`自己加密后的字符串为:${strSha1}`); 
        console.log(`微信传入的加密字符为:${signature}`); 
        console.log(`两者比较结果为:${signature == strSha1}`);

        // 签名对比，相同则按照微信要求返回echostr参数值
      if (signature == strSha1) {
            ctx.body = echostr
        } else {
                ctx.body = "你不是微信" }
        }
)

// 接受信息
router.post('/wechat', ctx => {
    const {xml: msg} = ctx.request.body
    console.log('Receive:', msg)
    const builder = new xml2js.Builder()
    let result;
    if(msg.Content.indexOf('node') !== -1) {
        
        result = builder.buildObject({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: 'news',
                ArticleCount: 1,
                Articles: {
                    item: {
                        Title: 'Node.js学习',
                        Description: '什么是Node.js  它能干什么',
                        PicUrl: 'https://mmbiz.qpic.cn/mmbiz_jpg/ePTLrNCuiaWhHSWQN5ZtBmEoG7sEBxSgejbhxwwgVBVu5Zj6FH43OXOw5lmTOr1157F8Xsd2gz3sjKlWj4bHhHA/0?wx_fmt=jpeg',
                        Url: 'http://wjp.vipgz5.idcfengye.com/static/index.html'
                    }
                }
            } 
        })
    } else {
        result = builder.buildObject({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: msg.MsgType,
                Content: 'Hello ' + msg.Content
                } 
        })
    }
    
    ctx.body = result
})
// 获取tonken

utils.getToken(tokenCache)

app.use(router.routes()); /*启动路由*/

app.use(router.allowedMethods());


app.listen(80);