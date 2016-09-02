var nlp = require('nlp_compromise');
var async = require('async');

var locationDictionary = require('../Dic/location.json');
var skillsDictionary = require('../Dic/skills.json');
var qualificationDictionary = require('../Dic/qualification.json');
var rolesDictionary = require('../Dic/roles.json');
var companiesDictionary = require('../Dic/companies.json');

//parses the individual terms to the lexicon format. Ex. {"angularjs":"skills"}
var lexiconParse = function(term,tag) {
  var lexicon = {};
  var normalizedTerm = nlp.term(term).normalize();
  lexicon[normalizedTerm] = tag;
  return lexicon;
};

//array of dictionary
var dictionaries = [{terms:locationDictionary,type:"location"},{terms:skillsDictionary,type:"skills"},{terms:qualificationDictionary,type:"qualification"},{terms:rolesDictionary,type:"roles"},{terms:companiesDictionary,type:"organization"}];

//Generates a lexicon parser function for all the dictionaries.
var lexiconMapper = dictionaries.map(function(dictionary) {
  return function(callback) {
    var lexiconDictionary = dictionary.terms.map(function(location) {
      return lexiconParse(location,dictionary.type);
    });
    //logic to add them to the db
    callback(null,lexiconDictionary);
  };
});

//Converts all the terms into their equivalent lexicons in parallel.
async.parallel(lexiconMapper,function(err,results){
  console.log(results);
});
