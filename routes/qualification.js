var nlp = require('nlp_compromise');

module.exports = function(qualificationTerms,profile) {
    var qualification = {
      term: qualificationTerms,
      relations: []
    };
    var relation = {};
    Date.daysBetween = function( date1, date2 ) {
      var date1_ms = date1.getTime();
      var date2_ms = date2.getTime();
      var difference_ms = date2_ms - date1_ms;
      var difference_ms = difference_ms/(1000*60*60);
      var days = Math.floor(difference_ms/24);
      return days ;
    }
    profile.profiles.sections.forEach(function(section,index) {
        section.chicklets.forEach(function(chicklet,index){
         //  if( chicklet.chickletid == "ROLES_PLAYED" && nlp.sentence(chicklet.chicklet_data.role.value).normal() == qualificationTerms) {
         //    var fromDate = chicklet.chicklet_data.from_when.value.split('/');
         //    var toDate = chicklet.chicklet_data.to_when.value.split('/');
         //    var date1 = new Date(fromDate[2],fromDate[1],fromDate[0]);
         //    var date2 = new Date(toDate[2],toDate[1],toDate[0]);
         //    var diffDays=Date.daysBetween(date1,date2);
         //      relation.relationName="has worked";
         //      relation.duration=diffDays;
         //      qualification.relations.push(relation);
         //      relation={};
         //  }
         // else if( chicklet.chickletid == "PROJECT" && nlp.sentence(chicklet.chicklet_data.role.value).normal() == qualificationTerms) {
         //   var fromDate = chicklet.chicklet_data.from_when.value.split('/');
         //   var tillDate = chicklet.chicklet_data.till_when.value.split('/');
         //   var date1 = new Date(fromDate[2],fromDate[1],fromDate[0]);
         //   var date2 = new Date(tillDate[2],tillDate[1],tillDate[0]);
         //   var diffDays=Date.daysBetween(date1,date2);
         //      relation.relationName="Did a Project";
         //      if(diffDays != null)
         //      relation.duration=diffDays;
         //      qualification.relations.push(relation);
         //      relation={};
         //  }
         if( chicklet.chickletid == "QUALIFICATION" && nlp.sentence(chicklet.chicklet_data.qualificationname.value).normal() == qualificationTerms) {
              console.log
              relation.relationName="degree_acquired";
              qualification.relations.push(relation);
              relation={};
          }

         else if( chicklet.chickletid == "INSTITUTION" && nlp.sentence(chicklet.chicklet_data.type.value).normal() == qualificationTerms) {
              relation.relationName="studied";
              qualification.relations.push(relation);
              relation={};
          }
        });
      });
  return qualification;
      
    }
