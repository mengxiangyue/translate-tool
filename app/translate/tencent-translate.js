const request = require('request');
const crypto = require('crypto');

const params = {
  Action: 'TextTranslate',
  Region: 'ap-guangzhou',
  Timestamp: `${Math.round((new Date()).getTime() / 1000)}`,
  Nonce: Math.round(Math.random() * 10000000),
  SecretId: 'AKIDmTzJRNCB0e6NSNqnCSVM2Zv6udBcKukN',
  Version: '2018-03-21',
  SourceText: '你好',
  Source: 'zh',
  Target: 'en',
  ProjectId: '1108351'
};

const paramPairs = [];
const requestPairs = [];
const newkeys = Object.keys(params).sort();　
for (const key of newkeys) {
  const value = encodeURIComponent(params[key])
  paramPairs.push(`${key}=${params[key]}`)
  requestPairs.push(`${key}=${value}`)
}
const joinText = paramPairs.join('&');
const finnalText = `GETtmt.tencentcloudapi.com/?${joinText}`;

const secretKey = 'hCoMk0bCh196ye8PYVGrHat4kKiwDKFy';


const signature = encodeURIComponent(crypto.createHmac('sha1', secretKey).update(finnalText).digest('base64'))
const finnalUrl = `https://tmt.tencentcloudapi.com/?${requestPairs.join('&')}&Signature=${signature}`;

console.log('mxy->', finnalUrl);

request.get({
    url: finnalUrl
}, function (err, res) {
  console.error(err);
    console.log(res.body, err)
});

