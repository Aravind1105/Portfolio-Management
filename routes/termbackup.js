var nlp = require('nlp_compromise');
var highland = require('highland');
// var mongoUtil = require('../db/mongoUtil');
var getTags = require('./getTags');
// var profile = require('../public/json/profile.json');
var _ = require('underscore');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://10.219.85.98",neo4j.auth.basic('neo4j','password'));
var session = driver.session();
var userData;
var terms = "";

module.exports = {
 buildIndexes : function(profile) {
   console.log("inside buildindexes");
      // console.log(profile);
              // mongoUtil.getConnection("mongodb://localhost:27017/Portfolio-Management",function(err,db) {
              var db = require("../db/mongoUtil").getConnection();
        var profileId = profile._id;
        profile.profiles.sections.forEach(function(section) {
        	section.chicklets.forEach(function(chicklet) {
        		var chickletData = chicklet.chicklet_data;
        		for(prop in chickletData) {
        			if(chickletData[prop].value !== undefined) {
                // console.log(chickletData[prop].value);
        				terms += chickletData[prop].value+" ";
        			}
        		}
        	});
        });


  // console.log("hi uma");
  terms = terms.replace(/,/g," ");
  terms = nlp.sentence(terms).normal();
  terms+=" ";
  // console.log(terms);
  	var lexiconStream = db.collection("lexicons").find({}).stream();
  	var extendObj = highland.extend();
  	highland("data",lexiconStream)
  		.map(function(lexicon) {
  			var lexicon = _.omit(lexicon,'_id','location','skills','organization','roles','qualification');
        var tag = getTags(terms,lexicon);
        if(tag!==undefined) {
          // console.log("Tag",tag);
  				return tag
  			}
  		}).map(function(tag) {
  			if(tag !== undefined) {
          var term = _.keys(tag)[0];
        	var relations = require("./"+tag[term])(term,profile);
          relations.type = tag[term];
          return relations;
  			}
  		}).map(function(d) {
  			if(d !== undefined && d.relations.length > 0) {
  				d.profileId = profileId;
          profile.profiles.sections.forEach(function(section){
            section.chicklets.forEach(function(chicklet){
              if(chicklet.chickletid == 'PROFILE_DATA')
              d.username=chicklet.chicklet_data.name.value
            });
          });
  				// d.username = profile.profiles.id;
          // console.log(d);
  				return d;
  			};
  		}).each(function(d) {
  			if(d !== undefined) {
          // console.log("d",d);
  					d.relations.forEach(function(relation) {
              // console.log(relation);
        			// if(relation.relationName === '') {
  						// 	relation.relationName = "relation";
  						// }
              // var query = "MATCH (user:Profile {name:{nameParam},id:{userId}}),(term:Term {term:{termParam}}) CREATE (user)-[relation:`"+relation.relationName+"`]->(term)";
  						var query = "MERGE (user:Profile {id:{userId}}) MERGE(term:"+d.type+" {term:{termParam}}) MERGE (user)-[relation:`"+relation.relationName+"`]->(term) ON CREATE SET relation={relationshipParam} user.name={nameParam}";
  						session.run(query,{nameParam: d.username,userId:d.profileId,termParam:d.term,relationshipParam:relation}).then(function(data) {
  							console.log("Creating Relations");
  							console.log(data);
  						}).catch(function(err) {
  							console.log("Printing errprs");
  							console.log(err);
  						});
  					});
  			}
  		});
  // });
  }

};




// buildIndexes(profile);
