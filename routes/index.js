var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
var rp = require('request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/canais', function(req, res, next) {
  
  // rp('https://jdconnect.rocket.chat/api/v1/channels.list')
  //   .then(function (htmlString) {
  //       // Process html...
  //   })
  //   .catch(function (err) {
  //       // Crawling failed...
  //   });

var options = {
    uri: 'https://jdconnect.rocket.chat/api/v1/channels.list',
    headers: {
        "X-Auth-Token": "1ZxRzTd-t4i8hhOlpJAgNiS1_wEHAqB0Sqq15DslMVB",
        "X-User-Id": "TWt2SqMWwa4uYjpZy"
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (repos) {
      res.send(repos)
    })
    .catch(function (err) {
        // API call failed...
    })
});



module.exports = router;
