var nlp = require('nlp_compromise');

module.exports = function(rolesTerms,profile){
      var relation = {};
      
      var role = {
        term: rolesTerms,
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
            if( chicklet.chickletid == "ROLES_PLAYED") {
              if(nlp.sentence(chicklet.chicklet_data.designation.value).normal()==rolesTerms) {
                var date1 = new Date(chicklet.chicklet_data.from_when.value);
                var date2 = new Date(chicklet.chicklet_data.to_when.value);
                var diffDays=Date.daysBetween(date1,date2);
                relation.relationName="has_played_that_role";
                relation.organisation="Work";
                relation.duration=diffDays.toString();
                role.relations.push(relation);
                relation={};
            }
          }
            else if(chicklet.chickletid == "WORKSUMMARY") {
               if(nlp.sentence(chicklet.chicklet_data.workExperience.value).normal()==rolesTerms) {
                relation.relationName="has_played_that_role";
                relation.organisation="professional_work";
                role.relations.push(relation);
                relation={};
            }
          }

           else if( chicklet.chickletid == "PROJECT" ) {
               if(nlp.sentence(chicklet.chicklet_data.role.value).normal()==rolesTerms){
               var fromDate = chicklet.chicklet_data.from_when.value.split('/');
               var tillDate = chicklet.chicklet_data.till_when.value.split('/');
               var date1 = new Date(fromDate[2],fromDate[1],fromDate[0]);
               var date2 = new Date(tillDate[2],tillDate[1],tillDate[0]);
               var diffDays=Date.daysBetween(date1,date2);
                relation.relationName="worked_as";
                relation.duration=diffDays.toString();
                role.relations.push(relation);
                relation={};
            }
          }
          });
        });
        return role;
      }
