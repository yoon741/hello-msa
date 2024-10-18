var express = require('express');
var router = express.Router();  // index.js에 있는 내용 데리고 옴 app은 뺌

var client_id = 'nEqrlyAZIhD5kpPebPap';
var client_secret = 'LR41a9MMIP';
var state = "RANDOM_STATE";
var redirectURI = encodeURI("http://localhost:3000/api/callback");
var api_url = "";

/* custom naver api login */
router.get('/api/naver', function(req, res, next) {
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");

});

/* custom naver api callback */
router.get('/api/callback', function(req, res, next) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

module.exports = router;