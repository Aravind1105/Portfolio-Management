var nlp = require('nlp_compromise');
var express = require("express");
   function buildIndexesinGraph () {
      mongoUtil.getConnection("mongodb://localhost:27017/Portfolio-Management",function(err,db) {
        var db = require("../db/mongoUtil").getConnection();
        console.log("lexicons");
        db.collection('lexicons').find({}).toArray(function(err, object) {
          var lexicons= object;
        });
      });
     };
buildIndexesinGraph();
