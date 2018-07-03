const crypto = require('crypto');
const request = require('request')

const md5 = crypto.createHash('md5');

const appid = '77699a751bfd1f31';
const key = 'tbJAaENfjscOaMIY8G0tOVtw88ZLgfWc';
const salt = (new Date).getTime();
const query = '你能确定一下这个正确吗？';
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
const from = 'zh';
const to = 'en';
const str1 = appid + query + salt + key;
const sign = md5.update(str1).digest('hex');

const params = {
    q: query,
    appKey: appid,
    salt: salt,
    from: from,
    to: to,
    sign: sign
}

request.post({url:'http://openapi.youdao.com/api', form: params}, function(err,httpResponse,body){ 
    console.log(body)
 })

// request.post({
//     url
// }, function (err, res) {
//     const result = unescape(res.body.replace(/\\u/g, '%u'));
//     console.log(result)
// });