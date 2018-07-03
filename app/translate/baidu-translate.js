const crypto = require('crypto');
const request = require('request');

const md5 = crypto.createHash('md5');

const appid = '20180427000151356';
const key = 'coFb7_Mlnfpf7taaIaWD';
const salt = (new Date()).getTime();
const query = '你好';
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
const from = 'zh';
const to = 'en';
const str1 = appid + query + salt + key;
const sign = md5.update(str1).digest('hex');

const url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(query)}&appid=${appid}&salt=${salt}&from=${from}&to=${to}&sign=${sign}`;

request.get({
    url
}, function (err, res) {
    const result = unescape(res.body.replace(/\\u/g, '%u'));
    console.log(result)
});
