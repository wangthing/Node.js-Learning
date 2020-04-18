// config.js
module.exports={
    appid: 'wx290a7761d5a4aec2',
    appsecret: '537065a2307561dc3f7b203b2d63101f',
    token: 'wangthing',
    menu: {
        "button": [
            {
                "type": "click", 
                "name": "前端", 
                "key": "web",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "Node.js",
                        "url": 'https://cloud.tencent.com/developer/article/1481429'
                    },
                    {
                        "type": "view",
                        "name": "React",
                        "url": 'http://caibaojian.com/react/'
                    }
                ]
              
            }, 
            {
                "name": "关于", 
                "sub_button": [
                    {
                        "type": "view", 
                        "name": "跑步记录", 
                        "url": "http://wjp.5gzvip.idcfengye.com/static/index.html"
                    }, 
                    {
                        "type": "view", 
                        "name": "Github", 
                        "url": "https://wangthing.github.com", 
                        
                    }, 
                    
                ]
            }
        ]
    }
}