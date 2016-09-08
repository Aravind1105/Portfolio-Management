var express = require("express");
var router = express.Router();
var relations=[];
var relation={};
var terms=[];
var flag=0;
var property={};
var date1,date2,diffDays;
module.exports ={
    Display_roles_rel:function(rolesTerms,profile){
      // console.log(rolesTerms);
      var db = require("../db/mongoUtil").getConnection();
      Date.daysBetween = function( date1, date2 ) {
        date1_ms = date1.getTime();
        date2_ms = date2.getTime();
        difference_ms = date2_ms - date1_ms;
        difference_ms = difference_ms/(1000*60*60);
        days = Math.floor(difference_ms/24);
        return days ;
      }
      for(arrindex=0;arrindex < rolesTerms.length;arrindex++) {
        profile[0].profiles.sections.forEach(function(section,index) {
          section.chicklets.forEach(function(chicklet,index){
            if( chicklet.chickletid == "ROLES_PLAYED") {
              if(chicklet.chicklet_data.role.value==rolesTerms[arrindex]) {
                flag=1;
               date1 = new Date(chicklet.chicklet_data.from_when.value);
               date2 = new Date(chicklet.chicklet_data.to_when.value);
                diffDays=Date.daysBetween(date1,date2);
                relation.relationName="has played that role";
                relation.organisation="Work";
                relation.duration=diffDays;
                relations.push(relation);
                relation={};
            }
          }
            else if( chicklet.chickletid == "WORKSUMMARY") {
               if(chicklet.chicklet_data.workExperience.value==rolesTerms[arrindex]) {
                 flag=1;
                relation.relationName="has played that role";
                relation.organisation="professional work";
                relations.push(relation);
                relation={};
            }
          }

           else if( chicklet.chickletid == "PROJECT" ) {
               if(chicklet.chicklet_data.role.value==rolesTerms[arrindex]){
                 flag=1;
               date1 = new Date(chicklet.chicklet_data.from_when.value);
               date2 = new Date(chicklet.chicklet_data.till_when.value);
                diffDays=Date.daysBetween(date1,date2);
                relation.relationName="worked as";
                relation.duration=diffDays;
                relations.push(relation);
                relation={};
            }
          }
          });
        });
        if (flag==1){
          property.term=rolesTerms[arrindex];
        property.relations=relations;flag=0;
        terms.push(property);
        // console.log(terms);
        property={};
      }
      }
      return terms;
}
};
