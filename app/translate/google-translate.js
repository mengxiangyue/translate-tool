// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Instantiates a client
const translate = new Translate();

// The text to translate
const text = ['你好', '不用谢'];

var options = {
    from: 'zh-CN',
    to: 'en'
};

// Translates some text into Russian
translate
    .translate(text, options)
    .then(results => {
        console.log(results)
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });