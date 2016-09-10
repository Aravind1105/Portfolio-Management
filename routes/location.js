var nlp = require('nlp_compromise');

module.exports = function(locationTerms,profile) {
  var relation = {};
  var location = {
    term: locationTerms,
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
  profile.sections.forEach(function(section,index) {
    section.chicklets.forEach(function(chicklet,index) {
      if( chicklet.chickletid == "PAST"  && nlp.sentence(chicklet.chicklet_data.place.value).normal() == locationTerms)
      {
        var fromDate = chicklet.chicklet_data.from_when.value.split('/');
        var toDate = chicklet.chicklet_data.to_when.value.split('/');
        var date1 = new Date(fromDate[2],fromDate[1],fromDate[0]);
        var date2 = new Date(toDate[2],toDate[1],toDate[0]);
        var diffDays=Date.daysBetween(date1,date2);
          relation.relationName="Used_To_Stay";
          relation.duration=diffDays.toString();
          location.relations.push(relation);
          relation = {};
      }
      else if( chicklet.chickletid == "CURRENT"  && nlp.sentence(chicklet.chicklet_data.place.value).normal() == locationTerms)
      {
          relation.relationName="stay";
          location.relations.push(relation);
          relation = {};
      }
     else if( chicklet.chickletid == "ROLES_PLAYED"  && nlp.sentence(chicklet.chicklet_data.location.value).normal() ==  locationTerms)
      {
        var date1 = new Date(chicklet.chicklet_data.from_when.value);
        var date2 = new Date(chicklet.chicklet_data.to_when.value);
        var diffDays = Date.daysBetween(date1,date2);
          relation.relationName = "Worked";
          relation.duration = diffDays.toString();
          location.relations.push(relation);
          relation = {};
      }
    });
  });
  return location;
}
