var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
router.post('/api/postdata', function (req, res) {
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
