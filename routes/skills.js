var express = require("express");
var router = express.Router();
var relations=[];
var relation={};
var terms=[];
var property={};
module.exports ={
  Display_skill_rel:function(skillTerms,profile){
    console.log(skillTerms);
       var db = require("../db/mongoUtil").getConnection();
       Date.daysBetween = function( date1, date2 ) {
         date1_ms = date1.getTime();
         date2_ms = date2.getTime();
         difference_ms = date2_ms - date1_ms;
         difference_ms = difference_ms/(1000*60*60);
        days = Math.floor(difference_ms/24);
         return days ;
       }
       for(arrindex=0;arrindex < skillTerms.length;arrindex++) {
         profile[0].profiles.sections.forEach(function(section,index) {
           section.chicklets.forEach(function(chicklet,index){
             if( chicklet.chickletid == "ROLES_PLAYED") {
               if(chicklet.chicklet_data.description.value==skillTerms[arrindex]) {
                 flag=1;
                date1 = new Date(chicklet.chicklet_data.from_when.value);
                date2 = new Date(chicklet.chicklet_data.to_when.value);
                 diffDays=Date.daysBetween(date1,date2);
                 relation.relationName="has worked";
                 relation.organisation="Work";
                 relation.duration=diffDays;
                 relations.push(relation);
                 relation={};
             }
           }
             else if( chicklet.chickletid == "WORKSUMMARY") {
                if(chicklet.chicklet_data.workExperience.value==skillTerms[arrindex]) {
                  flag=1;
                    // property.term=skillTerms[arrindex];
                 relation.relationName="has worked";
                 relation.organisation="professional work";
                 relations.push(relation);
                 relation={};
             }}
            else if( chicklet.chickletid == "PROJECT" ) {
                if(chicklet.chicklet_data.tech_skills_used.value==skillTerms[arrindex]){
                  flag=1;
                  // property.term=skillTerms[arrindex];
                date1 = new Date(chicklet.chicklet_data.from_when.value);
                date2 = new Date(chicklet.chicklet_data.till_when.value);
                 diffDays=Date.daysBetween(date1,date2);
                 relation.relationName="has experience with";
                 relation.duration=diffDays;
                 relations.push(relation);
                 relation={};
             }}
             else if(chicklet.chickletid == "SKILL"){
               if(chicklet.chicklet_data.name.value==skillTerms[arrindex]){
                 flag=1;
                //
                date1 = new Date(chicklet.chicklet_data.time_spent_on_it.value);
                timeindays = date1*30;
                relation.relationName="has learnt";
                relation.duration=timeindays;
                relations.push(relation);
                relation={};
             }}
           });
         });
         if(flag==1)
         { property.term=skillTerms[arrindex];
         property.relations=relations;
         terms.push(property);
         property={};
         flag=0;
       }
       }
      return terms;
  }
}
