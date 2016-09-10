
var nlp = require('nlp_compromise');

module.exports = function(companiesTerms,profile) {
    var relation = {};
    var organization = {
      term: companiesTerms,
      relations: []
    };

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
          if( chicklet.chickletid == "PROFILE_DATA") {
            if(nlp.sentence(chicklet.chicklet_data.organization.value).normal() == companiesTerms) {
            relation.relationName="employee_at";
            organization.relations.push(relation);
            relation={};
          }
        }
        else if( chicklet.chickletid == "ROLES_PLAYED") {
           if(nlp.sentence(chicklet.chicklet_data.organization.value).normal()==companiesTerms) {
              var date1 = new Date(chicklet.chicklet_data.from_when.value);
              var date2 = new Date(chicklet.chicklet_data.to_when.value);
              relation.relationName="employed_at";
              relation.duration=diffDays;
              organization.relations.push(relation);
              relation={};
        }
      }

         else if( chicklet.chickletid == "PROJECT" ) {
             if(nlp.sentence(chicklet.chicklet_data.done_at.value).normal() == companiesTerms){
             var fromDate = chicklet.chicklet_data.from_when.value.split('/');
             var tillDate = chicklet.chicklet_data.till_when.value.split('/');
             var date1 = new Date(fromDate[2],fromDate[1],fromDate[0]);
             var date2 = new Date(tillDate[2],tillDate[1],tillDate[0])
             var diffDays=Date.daysBetween(date1,date2);
              relation.relationName="did_the_project_at";
              relation.duration=diffDays;
              organization.relations.push(relation);
              relation={};
          }
        }
        else if( chicklet.chickletid == "ACTIVITIES" ) {
            if(nlp.sentence(chicklet.chicklet_data.organization.value).normal() == companiesTerms){
              //  property.term=companiesTerms[arrindex];
            var fromDate = chicklet.chicklet_data.from_when.value.split('/');
             var toDate = chicklet.chicklet_data.to_when.value.split('/');
             var date1 = new Date(fromDate[2],fromDate[1],fromDate[0]);
             var date2 = new Date(toDate[2],toDate[1],toDate[0])
             var diffDays=Date.daysBetween(date1,date2);
             relation.relationName="was_a_part_of_the_organisation";
             relation.duration=diffDays;
             organization.relations.push(relation);
             relation={};
         }
       }
      });
      });
    return organization;
    }
