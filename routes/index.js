var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
var rp = require('request-promise');

var serviceAccount = require("../JohnDeere-51668cf70974.json");

var usGlobal = "";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://johndeere-bef8c.firebaseio.com"
});

var db = admin.database();
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {

var options = {
    uri: 'https://jdconnect.rocket.chat/api/v1/channels.list',
    headers: {
        "X-Auth-Token": "1ZxRzTd-t4i8hhOlpJAgNiS1_wEHAqB0Sqq15DslMVB",
        "X-User-Id": "TWt2SqMWwa4uYjpZy"
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options).then(function (repos) {
      return repos
    }).then(function(repos){
      var userInfoJson = {
          uri: 'https://jdconnect.rocket.chat/api/v1/me',
          headers: {
              "X-Auth-Token": "1ZxRzTd-t4i8hhOlpJAgNiS1_wEHAqB0Sqq15DslMVB",
              "X-User-Id": "TWt2SqMWwa4uYjpZy"
          },
          json: true // Automatically parses the JSON string in the response
        };
        
        rp(userInfoJson).then(function(us){
            console.log('------------------');
            console.log(us);
            
            usGlobal = us;

            res.render('index', { chats: repos, title:"JDConnect" });
        })
    })
    .catch(function (err) {
        // API call failed...
    })
});


router.get('/chat/:id', function(req, res, next) {
  var id = req.params.id;
  var options = {
    uri: 'https://jdconnect.rocket.chat/api/v1/channels.info?roomId='+id,
    headers: {
        "X-Auth-Token": "1ZxRzTd-t4i8hhOlpJAgNiS1_wEHAqB0Sqq15DslMVB",
        "X-User-Id": "TWt2SqMWwa4uYjpZy"
    },
    json: true // Automatically parses the JSON string in the response
  };

  var optionsHistory = {
    uri: 'https://jdconnect.rocket.chat/api/v1/channels.history?roomId='+id,
    headers: {
        "X-Auth-Token": "1ZxRzTd-t4i8hhOlpJAgNiS1_wEHAqB0Sqq15DslMVB",
        "X-User-Id": "TWt2SqMWwa4uYjpZy"
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options).then(function (chatInfo) {
      return chatInfo
    }).then(function(info){
      rp(optionsHistory).then(function (chatHistory) {
        console.log(chatHistory.messages[0].u._id);

        for(i in chatHistory.messages){

            console.log(chatHistory.messages[i].u._id +"=="+ usGlobal._id)

          if(chatHistory.messages[i].u._id == usGlobal._id)
            chatHistory.messages[i].eu = true;
          else
            chatHistory.messages[i].eu = false;
        }
        console.log(chatHistory.messages);
        res.render('singleChat', { chatInfo: info.channel, history:chatHistory.messages.reverse() , title: "João" });
      
      }).catch(function (err) {
        // API call failed...
      })
    }).catch(function (err) {
        // API call failed...
    })
});




///api/v1/chat.postMessage

//post na minha api
//post na api
//

router.post('/new/:id', function(req, res, next) {
  console.log('Enviando mensagem');
  var id = req.params.id;
  var inputText = req.body.text;

  var options = {
      uri: 'https://jdconnect.rocket.chat/api/v1/chat.postMessage',
      method: 'POST',
      headers: {
          "X-Auth-Token": "1ZxRzTd-t4i8hhOlpJAgNiS1_wEHAqB0Sqq15DslMVB",
          "X-User-Id": "TWt2SqMWwa4uYjpZy"
      },
       body: {
            roomId: id,
            text: inputText,     
         },
      json: true // Automatically parses the JSON string in the response
    };

    console.log(options);

    rp(options)
    .then(function (parsedBody) {
       console.log(parsedBody);
       botResponde(inputText,id);
      
    }).then(function(){
      res.status(200).end();
    })
    .catch(function (err) {
      // POST failed...
      console.log(err);
    });
});



///METODO de resposta do BOT
function botResponde(msgInput,roomId){
    console.log('Enviando mensagem');
    var botFala = "";

    var options = {
          uri: 'https://jdconnect.rocket.chat/api/v1/chat.postMessage',
          method: 'POST',
          headers: {
              "X-Auth-Token": "0zSHCSebtLmT41AKcZ5YOkRQi3cIur0U0UxvRuzoqua",
              "X-User-Id": "iPpP56txSCvoExGaY"
          },
           body: {
                roomId: roomId,
                text: botFala,     
             },
          json: true // Automatically parses the JSON string in the response
    };

    if(msgInput.toLowerCase() == 'eu quero colher soja'){

        //harverst/S540/colher_soja
        url = "harverst/S540/colher_soja"
                // As an admin, the app has access to read and write all data, regardless of Security Rules
        var ref = db.ref(url);
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
          console.log(snapshot.val());
          
          for(var i in snapshot.val()){
            botFala = snapshot.val()[i].texto;
            options.body.text = botFala;
            rp(options)
              .then(function (parsedBody) {
                console.log(parsedBody);
              })
              .catch(function (err) {
                console.log(err);
              });
          }


        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    }if(msgInput.toLowerCase() == 'como voce esta?'){
        //status/T660/saude
        url = "status/T660/saude"
                // As an admin, the app has access to read and write all data, regardless of Security Rules
        var ref = db.ref(url);
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
          console.log(snapshot.val());
          
          botFala = snapshot.val()[0].text;
          options.body.text = botFala;
          rp(options)
            .then(function (parsedBody) {
              console.log(parsedBody);
            })
            .catch(function (err) {
              console.log(err);
            });


        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    }
    else{
      return
    }

}

module.exports = router;
