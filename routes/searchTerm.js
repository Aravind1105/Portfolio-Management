var fs=require('fs'),
                json;
var express = require("express");
var router = express.Router();
var relations=[];
var relation={};
var SearchTerm=[];
var locationTerms=[];
var qualificationTerms=[];
var companiesTerms=[];
var rolesTerms=[];
var skillTerms=[];
var date1,date2,diffDays,location_array,qualification_array,companies_array,roles_array,skill_array,companies;

router.get('/SearchTerm', function(req,res,next)
{
fs.readFile('./Dic/location.json', 'utf8', function (err, data) {
 if (err) throw err;
 location_array = JSON.parse(data);
  var db = require("../db/mongoUtil").getConnection();
 db.collection('user_profile').find({"profiles.id":"uma"}).toArray(function(err, object) {
   for(index=0;index < location_array.length;index++) {
    object[0].profiles.sections.forEach(function(section,index1) {
     section.chicklets.forEach(function(chicklet,index2) {
         for(propt in chicklet.chicklet_data){
           if(chicklet.chicklet_data[propt].value == location_array[index])
               locationTerms.push(chicklet.chicklet_data[propt].value);
           }
     });
   });
  }
  var location=require('../routes/location').Display_loc_rel(locationTerms,object);
  SearchTerm.push(location);
});
});
fs.readFile('./Dic/qualification.json', 'utf8', function (err, data) {
 if (err) throw err;
 qualification_array = JSON.parse(data);
 var db = require("../db/mongoUtil").getConnection();
 db.collection('portfolio_cache').find({"profiles.id":"uma"}).toArray(function(err, object) {
   for(index=0;index < qualification_array.length;index++) {
    object[0].profiles.sections.forEach(function(section,index1) {
     section.chicklets.forEach(function(chicklet,index2) {
         for(propt in chicklet.chicklet_data){
           if(chicklet.chicklet_data[propt].value == qualification_array[index])
               qualificationTerms.push(chicklet.chicklet_data[propt].value);
          }
     });
   });
 };
 var qualification=require('../routes/qualification').Display_qualification_rel(qualificationTerms,object);
 SearchTerm.push(qualification);
 // console.log(qualification);

  });
});
fs.readFile('./Dic/companies.json', 'utf8', function (err, data) {
 if (err) throw err;
 companies_array = JSON.parse(data);
 var db = require("../db/mongoUtil").getConnection();
 db.collection('portfolio_cache').find({"profiles.id":"uma"}).toArray(function(err, object) {
   for(index=0;index < companies_array.length;index++) {
    object[0].profiles.sections.forEach(function(section,index1) {
     section.chicklets.forEach(function(chicklet,index2) {
         for(propt in chicklet.chicklet_data){
           if(chicklet.chicklet_data[propt].value == companies_array[index])
               companiesTerms.push(chicklet.chicklet_data[propt].value);
           }
     });
   });
  }
   companies=require('../routes/companies').Display_companies_rel(companiesTerms,object);
 SearchTerm.push(companies);
 // console.log(companies);
 // res.status(200).json(companies);

});
});
  fs.readFile('./Dic/roles.json', 'utf8', function (err, data) {
   if (err) throw err;
   roles_array = JSON.parse(data);
   var db = require("../db/mongoUtil").getConnection();
   db.collection('user_profile').find({"profiles.id":"uma"}).toArray(function(err, object) {
     for(index=0;index < roles_array.length;index++) {
      object[0].profiles.sections.forEach(function(section,index1) {
       section.chicklets.forEach(function(chicklet,index2) {
           for(propt in chicklet.chicklet_data){
            //  if(chicklet.chicklet_data[propt].value == roles_array[index])
                // rolesTerms.forEach(term){
                //   if(roles_array[index] == term)
                //     flag=1;
                // }
                // if(flag==0)
                //  {
                   rolesTerms.push(chicklet.chicklet_data[propt].value);
                //    flag=1;
                //  }
                //  flag=0;
             }
       });
     });
    }
     var role=require('../routes/roles').Display_roles_rel(rolesTerms,object);
 SearchTerm.push(role);
 console.log(SearchTerm);
 // res.status(200).json(SearchTerm);
  });
  });
  fs.readFile('./Dic/skills.json', 'utf8', function (err, data) {
   if (err) throw err;
   skill_array = JSON.parse(data);
   var db = require("../db/mongoUtil").getConnection();
   db.collection('portfolio_cache').find({"profiles.id":"uma"}).toArray(function(err, object) {
     for(index=0;index < skill_array.length;index++) {
      object[0].profiles.sections.forEach(function(section,index1) {
       section.chicklets.forEach(function(chicklet,index2) {
           for(propt in chicklet.chicklet_data){
             if(chicklet.chicklet_data[propt].value == skill_array[index])
                 skillTerms.push(chicklet.chicklet_data[propt].value);
             }
       });
     });
    }
  var skill=require('../routes/skills').Display_skill_rel(skillTerms,object);
  SearchTerm.push(skill);
  // console.log(SearchTerm);
  res.status(200).json(SearchTerm);
});
  });
  });
module.exports =  router;
