var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/views/index.html')
});

/* user registration */
router.get('/user', function(req, res, next) {
  res.sendFile(__dirname + '/views/user.html')
});

/* users registration */
router.get('/users', function(req, res, next) {
  res.sendFile(__dirname + '/views/users.html')
});

/* product registration */
router.get('/product', function(req, res, next) {
  res.sendFile(__dirname + '/views/product.html')
});

module.exports = router;
