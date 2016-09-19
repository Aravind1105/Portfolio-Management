var express = require("express");
var router = express.Router();
var relations = [];
var relation = {};
var terms = [];
var property = {};
var date1, date2, diffDays, flag = 0;
router.get('/companies', function(req, res, next) {

});
module.exports = {
  Display_companies_rel: function(companiesTerms, profile) {
    var db = require("../db/mongoUtil").getConnection();
    Date.daysBetween = function(date1, date2) {
      date1_ms = date1.getTime();
      date2_ms = date2.getTime();
      difference_ms = date2_ms - date1_ms;
      difference_ms = difference_ms / (1000 * 60 * 60);
      days = Math.floor(difference_ms / 24);
      return days;
    }
    for (arrindex = 0; arrindex < companiesTerms.length; arrindex++) {
      profile[0].profiles.sections.forEach(function(section, index) {
        section.chicklets.forEach(function(chicklet, index) {
          if (chicklet.chickletid == "PROFILE_DATA") {
            if (chicklet.chicklet_data.organization.value == companiesTerms[arrindex]) {
              console.log("hello");
              flag = 1;
              //  property.term=companiesTerms[arrindex];
              relation.relationName = "present working organisation";
              relation.organization = "employee at";
              relations.push(relation);
              relation = {};
            }
          } else if (chicklet.chickletid == "ROLES_PLAYED") {
            if (chicklet.chicklet_data.organization.value == companiesTerms[arrindex]) {
              flag = 1;
              // property.term=companiesTerms[arrindex];
              date1 = new Date(chicklet.chicklet_data.from_when.value);
              date2 = new Date(chicklet.chicklet_data.to_when.value);
              relation.relationName = "has worked at";
              relation.organization = "employed at";
              relation.duration = diffDays;
              relations.push(relation);
              relation = {};
            }
          } else if (chicklet.chickletid == "PROJECT") {
            if (chicklet.chicklet_data.done_at.value == companiesTerms[arrindex]) {
              flag = 1;

              date1 = new Date(chicklet.chicklet_data.from_when.value);
              date2 = new Date(chicklet.chicklet_data.till_when.value);
              diffDays = Date.daysBetween(date1, date2);
              relation.relationName = "did the project at";
              relation.duration = diffDays;
              relations.push(relation);
              relation = {};
            }
          } else if (chicklet.chickletid == "ACTIVITIES") {
            if (chicklet.chicklet_data.organization.value == companiesTerms[arrindex]) {
              //  property.term=companiesTerms[arrindex];
              flag = 1;
              date1 = new Date(chicklet.chicklet_data.from_when.value);
              date2 = new Date(chicklet.chicklet_data.to_when.value);
              diffDays = Date.daysBetween(date1, date2);
              relation.relationName = "was a part of the organisation";
              relation.duration = diffDays;
              relations.push(relation);
              relation = {};
            }
          }

        });
      });
      if (flag == 1) {
        property.term = companiesTerms[arrindex];
        property.relations = relations;
        flag = 0;
        // console.log(property);
        terms.push(property);
        property = {};
      }
    }
    // console.log(terms);
    return terms;
  }
};
