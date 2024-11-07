var express = require('express');
var router = express.Router();

// REST API 서버 주소 등록
const usersrvURL = process.env.USER_SRV_URL || '127.0.0.1';
const productsrvURL = process.env.PRODUCT_SRV_URL || '127.0.0.1';

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile(__dirname + '/views/index.html')
  res.render('index', {layout: false,
    usersrvURL:usersrvURL, productsrvURL:productsrvURL}) // 인덱스파일을 보낼 곳은 {}
});

/* 404 not found page. */
router.get('/notfound', function(req, res, next) {
  res.sendFile(__dirname + '/views/notfound.html')
});

/* user registration */
router.get('/user', function(req, res, next) {
  res.sendFile(__dirname + '/views/user.html')
});

/* users registration */
router.get('/users', function(req, res, next) {
  res.sendFile(__dirname + '/views/users.html')
});

/* user one view */
router.get('/user/:mno', function(req, res, next) {
  res.sendFile(__dirname + '/views/userone.html')
});

/* user login 1 */
router.get('/loginuser', function(req, res, next) {
  res.sendFile(__dirname + '/views/userlogin.html')
});

/* secure page access */
router.get('/secure', function(req, res, next) {
  res.sendFile(__dirname + '/views/secure.html')
});

// ---

/* product registration */
router.get('/product', function(req, res, next) {
  res.sendFile(__dirname + '/views/product.html')
});

/* products registration */
router.get('/products', function(req, res, next) {
  res.sendFile(__dirname + '/views/products.html')
});

/* product one view */
router.get('/product/:pno', function(req, res, next) {
  res.sendFile(__dirname + '/views/productone.html')
});

/* product update */
router.get('/product_put/:pno', function(req, res, next) {
  res.sendFile(__dirname + '/views/product_put.html')
});


// ---

/* naver api login */
router.get('/login/naver', function(req, res, next) {
  res.sendFile(__dirname + '/views/naverlogin.html')
});

/* naver api callback */
router.get('/callback/naver', function(req, res, next) {
  res.sendFile(__dirname + '/views/callbacknaver.html')
});


module.exports = router;
