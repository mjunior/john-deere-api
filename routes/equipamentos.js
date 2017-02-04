var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("../JohnDeere-51668cf70974.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://johndeere-bef8c.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("equipamentos");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    res.send(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  // ref.once("value", function(snapshot) {
  //   console.log(snapshot.val());
  //   res.send(snapshot.val());
  // });

});

module.exports = router;
