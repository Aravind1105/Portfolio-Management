var fs=require('fs'),
                json;
var express = require('express');
var readline = require('readline');
var router = express.Router();
var request = require('request');

router.get('/api/getdata', function(req, res,next) {
var obj;
fs.readFile('./public/json/aboutme.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  // console.log(obj);
  res.json(obj);
});
});

router.patch('/api/postdata', function (req, res) {
  // var obj= {"profiles":req.body};
    // var obj=req.body;
    var outputFilename = './public/json/aboutme.json';
    fs.writeFile(outputFilename, JSON.stringify(req.body, null, 4), function(err) {
        if(err) {
          console.log(err);
        }
        else {
            console.log(req.body);
            res.send(req.body);
        }
    });
});

module.exports = router;
