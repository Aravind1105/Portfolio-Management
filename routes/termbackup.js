var nlp = require('nlp_compromise');
var highland = require('highland');
var mongoUtil = require('../db/mongoUtil');
var getTags = require('./getTags');
// var profile = require('../public/json/profile.json');
var _ = require('underscore');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://10.219.85.98",neo4j.auth.basic('neo4j','password'));
var session = driver.session();
var userData;
var terms = "";

// var
// buildIndexes(profile);
module.exports = {
  buildIndexes : function(profile) {
      // console.log(profile);
        var db = require("../db/mongoUtil").getConnection();
              // mongoUtil.getConnection("mongodb://10.219.85.76:27017/Portfolio-Management",function(err,db) {
        var profileId = profile._id;
        profile.sections.forEach(function(section) {
        	section.chicklets.forEach(function(chicklet) {
        		var chickletData = chicklet.chicklet_data;
        		for(prop in chickletData) {
        			if(chickletData[prop].value !== undefined) {
                console.log(chickletData[prop].value);
        				terms += chickletData[prop].value+" ";
        			}
        		}
        	});
        });


  console.log("hi uma");
  terms = terms.replace(/,/g," ");
  terms = nlp.sentence(terms).normal();
  terms+=" ";
  // console.log(terms);
  	var lexiconStream = db.collection("lexicons").find({}).stream();
  	var extendObj = highland.extend();
  	highland("data",lexiconStream)
  		.map(function(lexicon) {
  			var lexicon = _.omit(lexicon,'_id');
        // console.log("inside Lexicons");
        // console.log(terms);
  			var tag = getTags(terms,lexicon);
        if(tag!==undefined) {
          console.log("Tag",tag);
  				return tag
  			}
  		}).map(function(tag) {
  			if(tag !== undefined) {
          var term = _.keys(tag)[0];
        	var relations = require("./"+tag[term])(term,profile);
  				return relations;
  			}
  		}).map(function(d) {
  			if(d !== undefined && d.relations.length > 0) {
  				d.profileId = profileId;
  				d.username = profile.id;
  				return d;
  			};
  		}).each(function(d) {
  			if(d !== undefined) {
  					d.relations.forEach(function(relation) {
              // console.log(relation);
        			// if(relation.relationName === '') {
  						// 	relation.relationName = "relation";
  						// }
              // var query = "MATCH (user:Profile {name:{nameParam},id:{userId}}),(term:Term {term:{termParam}}) CREATE (user)-[relation:`"+relation.relationName+"`]->(term)";
  						var query = "MERGE (user:Profile {name:{nameParam},id:{userId}}) MERGE(term:Term {term:{termParam}}) MERGE (user)-[relation:`"+relation.relationName+"`]->(term)";
  						session.run(query,{nameParam: d.username,userId:d.profileId,termParam:d.term}).then(function(data) {
  							// console.log("Creating Relations");
  							// console.log(data);
  						}).catch(function(err) {
  							// console.log("Printing errprs");
  							// console.log(err);
  						});
  					});
  			}
  		});
  // });
  }

};
