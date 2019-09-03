var nlp = require('nlp_compromise');
module.exports = function(qualificationTerms, profile) {
  var qualification = {
    term: qualificationTerms,
    relations: []
  };
  var relation = {};
  Date.daysBetween = function(date1, date2) {
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = date2_ms - date1_ms;
    var difference_ms = difference_ms / (1000 * 60 * 60);
    var days = Math.floor(difference_ms / 24);
    return days;
  }
  profile.profiles.sections.forEach(function(section, index) {
    section.chicklets.forEach(function(chicklet, index) {
      if (chicklet.chickletid == "QUALIFICATION" && nlp.sentence(chicklet.chicklet_data.qualificationname.value).normal() == qualificationTerms) {
        console.log
        relation.relationName = "degree_acquired";
        qualification.relations.push(relation);
        relation = {};
      } else if (chicklet.chickletid == "INSTITUTION" && nlp.sentence(chicklet.chicklet_data.type.value).normal() == qualificationTerms) {
        relation.relationName = "studied";
        qualification.relations.push(relation);
        relation = {};
      }
    });
  });
  return qualification;

}
