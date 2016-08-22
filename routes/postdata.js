var express = require('express');

var router = express.Router();
var request = require('request');
var fs = require('fs');

// var obj;
// fs.writeFile('./public/json/aboutme.json', 'utf8', function (err, data) {
//   if (err) throw err;
//   obj = JSON.parse(data);
//   console.log(obj);
//   res.json(obj.profiles);
// });
// });

// router.post('/api/postdata/uma', function (req, res) {
//   fs.writeFile(__dirname+"./public/json/aboutme.json", req.body, function(err) {
//     if(err) {
//        return console.log(err);
//     }
//     console.log(req.body);
//     res.send('The file was saved!');
//   });
// });
 router.post('/api/postdata', function (req, res) {
var myData = {
  name:'test',
  version:'1.0'
}

var outputFilename = 'my.json';

fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
      res.send("JSON saved to " + outputFilename);
    }
});
});
// router.post('/api/postdata', function(req, res) {
//  var object = req.body;
//  request.post({
//    uri: "http://localhost:3000/profiles",
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: object,
//    json: true
//  });
// });

module.exports = router;
