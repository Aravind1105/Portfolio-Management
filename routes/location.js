var express = require("express");
var terms=[];
var property={};
var location={};
var relations=[];
var relation={};
var date1,date2,diffDays,flag=0;
module.exports = {
  Display_loc_rel:function(locationTerms,profile){
    var db = require("../db/mongoUtil").getConnection();
    Date.daysBetween = function( date1, date2 ) {
      date1_ms = date1.getTime();
      date2_ms = date2.getTime();
      difference_ms = date2_ms - date1_ms;
      difference_ms = difference_ms/(1000*60*60);
       days = Math.floor(difference_ms/24);
      return days ;
    }
     for(arrindex=0;arrindex < locationTerms.length;arrindex++) {
      profile[0].profiles.sections.forEach(function(section,index) {
        section.chicklets.forEach(function(chicklet,index) {
          if( chicklet.chickletid == "PAST"  && chicklet.chicklet_data.place.value == locationTerms[arrindex] )
          {
            flag=1;
            // console.log(locationTerms[arrindex]);
            //  property.term=locationTerms[arrindex];
             date1 = new Date(chicklet.chicklet_data.from_when.value);
             date2 = new Date(chicklet.chicklet_data.to_when.value);
              diffDays=Date.daysBetween(date1,date2);
              relation.relationName="Used To Stay";
              relation.duration=diffDays;
              relations.push(relation);
              relation={};
          }
          else if( chicklet.chickletid == "CURRENT"  && chicklet.chicklet_data.place.value == locationTerms[arrindex])
          {flag=1;

            // property.term=locationTerms[arrindex];
             date1 = new Date(chicklet.chicklet_data.from_when.value);
             date2 = new Date();
              diffDays=Date.daysBetween(date1,date2);
              relation.relationName="   stay";
              relation.duration=diffDays;
              relations.push(relation);
              relation={};
          }
         else if( chicklet.chickletid == "ROLES_PLAYED"  && chicklet.chicklet_data.location.value ==  locationTerms[arrindex])
          {
            flag=1;
          //
             date1 = new Date(chicklet.chicklet_data.from_when.value);
             date2 = new Date(chicklet.chicklet_data.to_when.value);
              diffDays=Date.daysBetween(date1,date2);
              relation.relationName="Worked";
              relation.duration=diffDays;
              relations.push(relation);
              relation={};
          }
        });

      });
      if(flag==1){
      property.term=locationTerms[arrindex];
      property.relations=relations;
      flag=0;
      terms.push(property);
      property={};
    }
      }
     return terms;
    }
};
