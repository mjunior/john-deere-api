// var express = require('express');
// var router = express.Router();
// var admin = require("firebase-admin");
// var serviceAccount = require("../JohnDeere-51668cf70974.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://johndeere-bef8c.firebaseio.com"
// });

// var db = admin.database();

// router.get('/', function(req, res, next) {
//   // As an admin, the app has access to read and write all data, regardless of Security Rules
//   var ref = db.ref("equipamentos");
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on("value", function(snapshot) {
//     res.render('index', { colheitadeiras: snapshot.val() });
//   }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });

// });

// //request.params.id

// //harverst/S540/colher_soja
// router.get('/:banco/:modelo/:pergunta', function(req, res, next) {

//   var modelo = req.params.modelo;
//   var pergunta = req.params.pergunta;
//   var banco = req.params.banco
//   var url = ""

//   if(banco && modelo && pergunta){
//     //harverst/S540/colher_soja
//     url = banco+"/"+modelo+"/"+pergunta+""
//   }

//   // As an admin, the app has access to read and write all data, regardless of Security Rules
//   var ref = db.ref(url);
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on("value", function(snapshot) {
//     console.log(snapshot.val());
//     res.send(snapshot.val());
//   }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });

// });



// module.exports = router;
