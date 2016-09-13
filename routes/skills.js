var nlp = require('nlp_compromise');

module.exports = function(skillTerm,profile) {
      var relation={};
      var date1,date2,diffDays;
      var intensity = 0;
      // var weightage = {
      //   ROLES_PLAYED: 4,
      //   WORK_SUMMARY: 3,
      //   PROJECT: 5,
      //   SKILLL: 2,
      // };
       var skill = {
          term: skillTerm,
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
             if(nlp.sentence(chicklet.chicklet_data.description.value).normal()==skill.term) {
                //  property.term=skillTerms[arrindex];
              var date1 = new Date(chicklet.chicklet_data.from_when.value);
              var date2 = new Date(chicklet.chicklet_data.to_when.value);
              var diffDays=Date.daysBetween(date1,date2);
               relation.relationName="has_worked";
               relation.organisation="Work";
               relation.duration=diffDays.toString();
               if(isNaN(relation.duration)) {
                 relation.duration = 0;
               }
               relation.intensity = 2;
               skill.relations.push(relation);
               relation={};
           }
         }
           else if( chicklet.chickletid == "WORK_SUMMARY") {
              if(nlp.sentence(chicklet.chicklet_data.workExperience.value).normal()==skill.term) {
                  // property.term=skillTerms[arrindex];
               relation.relationName="has_worked";
               relation.intensity = 3;
               relation.organisation="professional_work";
               skill.relations.push(relation);
               relation={};
           }}
          else if( chicklet.chickletid == "PROJECT" ) {
            if(chicklet.chicklet_data.tech_skills_used.value !== undefined) {

              var normalizedSkills = chicklet.chicklet_data.tech_skills_used.value.split(',');
              normalizedSkills.forEach(function(normalizedSkill) {
                if(nlp.sentence(normalizedSkill).normal()==skill.term) {
                  var fromDate = chicklet.chicklet_data.from_when.value.split('/');
                  var tillDate = chicklet.chicklet_data.till_when.value.split('/');
                  var date1 = new Date(fromDate[2],fromDate[1],fromDate[0]);
                  var date2 = new Date(tillDate[2],tillDate[1],tillDate[0]);
                  var diffDays = Date.daysBetween(date1,date2);
                  relation.intensity =  4;
                  relation.relationName="has_experience_with";
                  relation.duration=diffDays.toString();
                  if(isNaN(relation.duration)) {
                    relation.duration = 0;
                  }
                  skill.relations.push(relation);
                  relation = {};
                };
              });
            }
           }
           else if(chicklet.chickletid == "SKILL"){
             if(chicklet.chicklet_data.name.value !== undefined) {

              var normalizedSkills = chicklet.chicklet_data.name.value.split(',');
              normalizedSkills.forEach(function(normalizedSkill) {
                if(nlp.sentence(normalizedSkill).normal()==skill.term) {
                 var date1 = new Date(chicklet.chicklet_data.time_spent_on_it.value);
                 var date2 = new Date();
                  // timeindays = date1*30;
                    var diffDays = Date.daysBetween(date1,date2);
                  relation.relationName="has_learnt";
                  relation.duration=diffDays.toString();
                  relation.intensity =  2;
                  if(isNaN(relation.duration)) {
                    relation.duration = 0;
                  }
                  skill.relations.push(relation);
                  relation={};
                }
              });
            }
            }
         });
       });
     return skill;
}
