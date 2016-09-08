var express = require("express");
var router = express.Router();
var relations=[];
var relation={};
var terms=[];
var property={};
var date1,date2,diffDays,flag=0;

module.exports = {
    Display_qualification_rel:function(qualificationTerms,profile){
    var db = require("../db/mongoUtil").getConnection();
    Date.daysBetween = function( date1, date2 ) {
      date1_ms = date1.getTime();
      date2_ms = date2.getTime();
      difference_ms = date2_ms - date1_ms;
      difference_ms = difference_ms/(1000*60*60);
       days = Math.floor(difference_ms/24);
      return days ;
    }
     for(arrindex=0;arrindex < qualificationTerms.length;arrindex++) {
      profile[0].profiles.sections.forEach(function(section,index) {
        section.chicklets.forEach(function(chicklet,index){
          if( chicklet.chickletid == "ROLES_PLAYED" && chicklet.chicklet_data.role.value == qualificationTerms[arrindex]) {
            flag=1;
            // property.term= qualificationTerms[arrindex];
             date1 = new Date(chicklet.chicklet_data.from_when.value);
             date2 = new Date(chicklet.chicklet_data.to_when.value);
              diffDays=Date.daysBetween(date1,date2);
              relation.relationName="has worked";
              relation.duration=diffDays;
              relations.push(relation);
              relation={};
          }
         else if( chicklet.chickletid == "PROJECT" && chicklet.chicklet_data.role.value == qualificationTerms[arrindex] ) {
           flag=1;
            //  property.term= qualificationTerms[arrindex];
             date1 = new Date(chicklet.chicklet_data.from_when.value);
             date2 = new Date(chicklet.chicklet_data.till_when.value);
             diffDays=Date.daysBetween(date1,date2);
              relation.relationName="Did a Project";
              if(diffDays != null)
              relation.duration=diffDays;
              relations.push(relation);
              relation={};
          }

         else if( chicklet.chickletid == "QUALIFICATION" && chicklet.chicklet_data.qualificationname.value == qualificationTerms[arrindex] ) {
           flag=1;
            //  property.term= qualificationTerms[arrindex];
            //  date1 = new Date(chicklet.chicklet_data.from_when.value);
            //  date2 = new Date(chicklet.chicklet_data.till_when.value);
            //  diffDays=Date.daysBetween(date1,date2);
              relation.relationName="";
              // if(diffDays != null)
              // relation.duration=diffDays;
              relations.push(relation);
              relation={};
          }

         else if( chicklet.chickletid == "INSTITUTION" && chicklet.chicklet_data.type.value == qualificationTerms[arrindex] ) {
           flag=1;
            //  property.term= qualificationTerms[arrindex];
            //  date1 = new Date(chicklet.chicklet_data.from_when.value);
            //  date2 = new Date(chicklet.chicklet_data.till_when.value);
            //  diffDays=Date.daysBetween(date1,date2);
              relation.relationName="";
              // if(diffDays != null)
              // relation.duration=diffDays;
              relations.push(relation);
              relation={};
          }
        });
      });
      if(flag==1){
      property.term=qualificationTerms[arrindex];
      property.relations=relations;
      flag=0;
    terms.push(property);
      property={};
    }
    }
  return terms;
  }
  // };
};
