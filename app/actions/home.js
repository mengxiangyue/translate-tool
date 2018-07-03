// @flow
const Translate = require('@google-cloud/translate');

const crypto = require('crypto');
const request = require('request');
// let fs = require ('fs');
const https = require('https');

type actionType = {
  +type: string
};

export const TranslateProvider = Object.freeze({
  GOOGLE: Symbol('google'),
  BAIDU: Symbol('baidu'),
  YOUDAO: Symbol('youdao'),
  TENCENT: Symbol('tencent'),
  BING: Symbol('BING')
});

export const EXCHANGE_LANGUAGE = 'EXCHANGE_LANGUAGE';
export const TRANSLATE_LANGUAGE = 'TRANSLATE_LANGUAGE';
export const SOURCETEXT_UPDATE = 'SOURCETEXT_UPDATE';
export const TRANSLATE_RESULT_UPDATE = 'TRANSLATE_RESULT_UPDATE';

export function sourceTextUpdate(value: string) {
  return {
    type: SOURCETEXT_UPDATE,
    value
  };
}

export function exchangeLanguage() {
  return {
    type: EXCHANGE_LANGUAGE
  };
}

export function resultUpdate(provider, result) {
  return {
    type: TRANSLATE_RESULT_UPDATE,
    provider,
    value: result
  };
}

export function translateLanguage() {
  return (dispatch, getState) => {
    const {
      from,
      target,
      sourceText
    } = getState().home;

    const {
      youdaoAppId,
      youdaoKey,
      baiduAppId,
      baiduKey,
      tencentProjectId,
      tencentSecretId,
      bingSubscriptionKey
    } = getState().config;

    console.log('mxy222----->', getState().config);
    googleTranslate(dispatch, from, target, sourceText);
    youdaoTranslate(dispatch, from, target, sourceText, youdaoAppId, youdaoKey);
    baiduTranslate(dispatch, from, target, sourceText, baiduAppId, baiduKey);
    tencentTranslate(dispatch, from, target, sourceText, tencentProjectId, tencentSecretId);
    bingTranslate(dispatch, from, target, sourceText, bingSubscriptionKey);
  };

  // return (dispatch: (action: actionType) => void) => {
  //   console.log('mxy->', arguments);
  //   setTimeout(() => {
  //     dispatch({
  //       type: TRANSLATE_LANGUAGE
  //     });
  //   }, 2000);
  // };
}

function googleReplace(input: string) {
  return input.replace('中文', 'zh-CN').replace('英文', 'en');
}

function googleTranslate(dispatch, from: string, target: string, sourceText: string) {
  const translate = new Translate();

  const text = [sourceText];

  const options = {
    from: googleReplace(from),
    to: googleReplace(target)
  };

  translate
    .translate(text, options)
    .then(results => {
      console.log('google---->', results);
      const translation = results[0].join(' ');

      dispatch(resultUpdate(TranslateProvider.GOOGLE, translation));
    })
    .catch(err => {
      console.error('ERROR:', err);
      dispatch(resultUpdate(TranslateProvider.GOOGLE, 'Google translate error!'));
    });
}

function youdaoReplace(input: string) {
  return input.replace('中文', 'zh').replace('英文', 'en');
}

function youdaoTranslate(dispatch, from: string, target: string, sourceText: string, appid: string, key: string) {
  if (appid == '' || key == '') {
    dispatch(resultUpdate(TranslateProvider.YOUDAO, 'Youdao needs to set appid and key!'));
    return;
  }
  const md5 = crypto.createHash('md5');

  const salt = (new Date()).getTime();
  const query = sourceText;
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const f = youdaoReplace(from);
  const to = youdaoReplace(target);
  const str1 = appid + query + salt + key;
  const sign = md5.update(str1).digest('hex');

  const params = {
    q: query,
    appKey: appid,
    salt,
    from: f,
    to,
    sign
  };

  console.log('youdao -> param: ', params);

  request.post({
    url: 'http://openapi.youdao.com/api',
    form: params,
    headers: {
      'Content-type': 'application/json'
    },
    json: true
  }, (err, httpResponse, body) => {
    if (err) {
      dispatch(resultUpdate(TranslateProvider.YOUDAO, 'Youdao translate error!'));
    } else {
      dispatch(resultUpdate(TranslateProvider.YOUDAO, body.translation.join(' ')));
    }

  });
}

function baiduReplace(input: string) {
  return input.replace('中文', 'zh').replace('英文', 'en');
}

function baiduTranslate(dispatch, from: string, target: string, sourceText: string, appid: string, key: string) {
  if (appid == '' || key == '') {
    dispatch(resultUpdate(TranslateProvider.BAIDU, 'Baidu needs to set appid and key'));
    return;
  }
  const md5 = crypto.createHash('md5');

  const salt = (new Date()).getTime();
  const query = sourceText;
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const f = baiduReplace(from);
  const to = baiduReplace(target);
  const str1 = appid + query + salt + key;
  const sign = md5.update(str1).digest('hex');

  const url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(query)}&appid=${appid}&salt=${salt}&from=${f}&to=${to}&sign=${sign}`;

  request.get({
    url,
    json: true
  }, (err, res) => {
    if (err) {
      dispatch(resultUpdate(TranslateProvider.BAIDU, 'Baidu translate error'));
    } else {
      const result = res.body;  //unescape(res.body.replace(/\\u/g, '%u'));
      const resultString = result.trans_result.reduce((first, second) =>{
        return first + second.dst;
      }, '');
      dispatch(resultUpdate(TranslateProvider.BAIDU, resultString));
    }
  });
}

function tencentReplace(input: string) {
  return input.replace('中文', 'zh').replace('英文', 'en');
}
function tencentTranslate(dispatch, from: string, target: string, sourceText: string, projectId: string, secretId: string) {
  if (projectId == '' || secretId == '') {
    dispatch(resultUpdate(TranslateProvider.TENCENT, 'TENCENT needs to set projectId and secretId'));
    return;
  }
  const params = {
    Action: 'TextTranslate',
    Region: 'ap-shanghai',
    Timestamp: `${Math.round((new Date()).getTime() / 1000)}`,
    Nonce: Math.round(Math.random() * 10000000),
    SecretId: secretId,
    Version: '2018-03-21',
    SourceText: sourceText,
    Source: tencentReplace(from),
    Target: tencentReplace(target),
    ProjectId: projectId
  };

let paramPairs = [];
let requestPairs = [];
const newkeys = Object.keys(params).sort();
for (const key of newkeys) {
    paramPairs.push(`${key}=${params[key]}`);
    const value = encodeURIComponent(params[key]);
    requestPairs.push(`${key}=${value}`);
}
const joinText = paramPairs.join('&');
const finnalText = `GETtmt.tencentcloudapi.com/?${joinText}`;

const secretKey = 'hCoMk0bCh196ye8PYVGrHat4kKiwDKFy';


const signature = encodeURIComponent(crypto.createHmac('sha1', secretKey).update(finnalText).digest('base64'))
const finnalUrl = `https://tmt.tencentcloudapi.com/?${requestPairs.join('&')}&Signature=${signature}`;

request.get({
    url: finnalUrl,
    json: true
}, (err, res) => {
    console.error('TranslateProvider.TENCENT', res, err);
    if (err) {
      dispatch(resultUpdate(TranslateProvider.TENCENT, 'Tencent translate error!'));
    } else {
      dispatch(resultUpdate(TranslateProvider.TENCENT, res.body.Response.TargetText));
    }
});
}

function bingReplace(input: string) {
  return input.replace('中文', 'zh-Hans').replace('英文', 'en');
}
function bingTranslate(dispatch, from: string, target: string, sourceText: string, subscriptionKey: string) {
  if (subscriptionKey == '') {
    dispatch(resultUpdate(TranslateProvider.BING, 'Bing needs to set subscriptionKey!'));
    return;
  }

  let host = 'api.cognitive.microsofttranslator.com';
  let path = '/translate?api-version=3.0';

  // Translate to German and Italian.
  const params = `&from=${bingReplace(from)}&to=${bingReplace(target)}`;
  console.log('bing param', params);

  const content = JSON.stringify ([{'Text' : sourceText}]);

  const response_handler = function (response) {
      let body = '';
      response.on ('data', function (d) {
          body += d;
      });
      response.on ('end', function () {
          // let json = JSON.stringify(JSON.parse(body), null, 4);
          // console.log(json);
        const json = JSON.parse(body);
        console.log('bing', json);
        dispatch(resultUpdate(TranslateProvider.BING, json[0].translations[0].text));
      });
      response.on ('error', function (e) {
          console.log ('Error: ' + e.message);
          dispatch(resultUpdate(TranslateProvider.BING, 'Bing translate error!'));
      });
  };

  const get_guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

    let request_params = {
      method : 'POST',
      hostname : host,
      path : path + params,
      headers : {
          'Content-Type' : 'application/json',
          'Ocp-Apim-Subscription-Key' : subscriptionKey,
          'X-ClientTraceId' : get_guid (),
      }
    };

    let req = https.request (request_params, response_handler);
    req.write (content);
    req.end ();
  }

