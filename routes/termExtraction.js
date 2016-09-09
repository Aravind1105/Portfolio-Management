var nlp = require('nlp_compromise');
var highland = require('highland');
var mongoUtil = require('../db/mongoUtil');
var getTags = require('./getTags');
var profile = require('../public/json/profile.json');
var _ = require('underscore');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://10.219.85.98",neo4j.auth.basic('neo4j','password'));
var session = driver.session();
var userData;
var terms = "";

var buildIndexes = function(profile) {

var profileId = profile._id;
profile.profiles.sections.forEach(function(section) {
	section.chicklets.forEach(function(chicklet){
		var chickletData = chicklet.chicklet_data;
		for(prop in chickletData) {
			if(chickletData[prop].value !== undefined) {
				terms += chickletData[prop].value+" ";
			}
		}
	});
});

//gives the user
function getUser(userParams) {
	console.log(userData);
	if(userData === undefined) {
		var query = "MATCH (user:Profile {name: {nameParam},id:{userId}}) return user";
		return session.run(query,userParams)
			.then(function(user){
				console.log("Inside then");
				console.log(user);
				if(!user) {
					return createUserNode(userParams).then(function(user){
						userData = user;
						return user;
					});
				}
				else
				return user;
			}).catch(function(err) {
				console.log("Error",err);
			})
	}
	else
	return user;

};

// var user = getUser(profile.profiles.id,profile._id)
// user.then(function(user) {
// 	console.log(user);
// });

var createUserNode = function(userParams) {
	var query = "CREATE (user:Profile {name:{nameParam},id:{userId}}) return user";
	return session.run(query,userParams)
};

var createTermNode = function(termParams) {
	var query = "CREATE (term:Term {term:{termParam}}) return term";
	return session.run(query,termParams);
};

var getTerm = function(termParams) {
	var query = "MATCH (term:Term {term: {nameParam}}) return term";
	return session.run(query,termParams)
			.then(function(term) {
				if(!term)
				return createTermNode(termParams);
				else
				return term;
			}).catch(function(err) {
				console.log(err);
			})
};

// var createUserNode = "Create (user:Profile {name:{nameParam},_id:{userId}})";
// session.run(createUserNode,{nameParam: profile.profiles.id,userId:profile.profileId});

terms = terms.replace(/,/g," ");
terms = nlp.sentence(terms).normal();
mongoUtil.getConnection("mongodb://localhost:27017/Portfolio-Management",function(err,db) {

	var lexiconStream = db.collection("lexicons").find({}).stream();
	var extendObj = highland.extend();
	highland("data",lexiconStream)
		.map(function(lexicon) {
			var lexicon = _.omit(lexicon,'_id');
			var tag = getTags(terms,lexicon);
			if(tag!==undefined) {
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
				d.username = profile.profiles.id;
				return d;
			};
		}).each(function(d) {
			if(d !== undefined) {
				console.log(d);
				// console.log("dlfsja");
				// console.log({nameParam:d.username,userId:d.profileId});
				var getTermPromise = getTerm({nameParam:d.term});
				var getUserPromise = getUser({nameParam:d.username,userId:d.profileId});
				var promises = [getTermPromise,getUserPromise];
				// console.log("Promises");
				Promise.all(promises).then(function(values) {
					console.log("Inside Promise all")
					d.relations.forEach(function(relation) {
						// var query = "MERGE (user:Profile {name:{nameParam},id:{userId}}) MERGE(term:Term {term:termParam}) CREATE (user)-[relation:`"+relation.relationName+"`]->(term)";
						var query = "MATCH (user:Profile {name:{nameParam},id:{userId}}),(term:Term {term:{termParam}}) MERGE (user)-[relation:`"+relation.relationName+"`]->(term)";
						session.run(query,{nameParam: d.username,userId:d.profileId,termParam:d.term}).then(function(data) {
							console.log("Creating Relations");
							console.log(data);
						}).catch(function(err) {
							console.log("Printing errprs");
							console.log(err);
						});
					});
				});

			}
		});
});
};

buildIndexes(profile);
