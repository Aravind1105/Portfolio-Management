var portfolioDefinition =  require("../public/json/portfolio.json");
var userProfile = require("../public/json/user_profile.json");
var util = require("util");
var _ = require("lodash");
var fs = require("fs");

var mergedProfile = [];
userProfile.profiles.sections.forEach(function(userProfileSection) {
  portfolioDefinition.profiles.sections.forEach(function(portfolioSection,portfolioIndex) {
    if(userProfileSection.section_id == portfolioSection.section_id) {
      var mergedSection=_.merge(userProfileSection,portfolioSection);
      // console.log("MErged Sections");
      // console.log(mergedSection);
      userProfileSection.chicklets.forEach(function(userProfileChicklet) {
        portfolioSection.chicklets.forEach(function(portfolioChicklet) {
          if(userProfileChicklet.chickletid == portfolioChicklet.chickletid) {
            var mergedChicklet = _.merge(userProfileChicklet,portfolioChicklet);

            mergedSection.chicklets.forEach(function(mergedSectionChicklet,index) {
              if(mergedSectionChicklet.chickletid == mergedChicklet.chickletid) {
                mergedSection.chicklets[index].chicklet_data.push(mergedChicklet);
              }
            });
          }
        });
      });
      mergedProfile.push(mergedSection);
    }
  });
});

// fs.writeFile("mergedData.json",JSON.stringify(mergedProfile,null,2));
console.log(util.inspect(mergedProfile,{showHidden:false, depth:null}));
