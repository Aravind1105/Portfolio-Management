angular.module('portfolio')
  .controller('CreateController', ["$scope", "$http", "chicklet", "$mdDialog", "profile", "$rootScope", "$window", function($scope, $http, chicklet, $mdDialog, profile, $rootScope, $window) {
    var config = {
      headers: {
        'Content-Type': 'application/JSON'
      }
    }
    profile.getData($rootScope.profileId).success(function(resources) {
      console.log("inside createctrl");
      $scope.resource = resources[0];
    });  
    $scope.chickletData = chicklet.chicklet_data;  
    $scope.cancel = function() {  
      $mdDialog.cancel();  
    };
    $scope.save = function() {
      for (i = 0; i < $scope.contacts.length; i++) {
        if (i == 0)
          skills = $scope.contacts[i].name;
        else {
          skills = skills + "," + $scope.contacts[i].name;
        }
      }
      $scope.resource.profiles.sections.forEach(function(section) {
        if (section.section_id === chicklet.sectionName) {
          section.chicklets.push(chicklet);
          var fd = new FormData();
          fd.append("resource", angular.toJson($scope.resource));
          console.log($scope.resource.profiles);
          var res = $http.patch("/api/postdata", fd, {
            transformRequest: angular.identity,
            headers: {
              "Content-Type": undefined
            }
          });
          res.success(function(data, status, headers, config) {
            section = processSectionDisplay("section", section);
            $mdDialog.cancel();
            $window.location.reload();
          });
        }
      });
    };
    $scope.endorsers = [
      "Co-worker",
      "Customer",
      "Reported",
      "Manager"
    ];
    $scope.gender = [
      "Male",
      "Female"
    ];
    $scope.activity_types = [
      "Co-curricular",
      "Volunteering"
    ];
    $scope.publication_types = [
      "Books",
      "Journals",
      "Scientific Papers"
    ];
    $scope.conference_types = [
      "Industry",
      "Technical",
      "Scientific"
    ];
    $scope.statuses = [
      "Beta",
      "Released",
      "Open Source"
    ];
    $scope.types = [
      "School",
      "College",
      "Institute",
      "University"
    ];
    $scope.streams = [
      "Engineering",
      "Others"
    ];
    $scope.levels = [
      "U G",
      "P G",
      "Doctoral",
      "Certification"
    ];
    $scope.activities = [
      "Stay",
      "Work",
      "Study"
    ];
    $scope.blood_group = [
      "A+", "AB+", "A-", "O+", "B+", "O-", "B-", "AB-"
    ];
    $scope.marital_status = [
      "Married", "Single"
    ];
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    $scope.contacts = [];
    $scope.filterSelected = true;

    $scope.querySearch = querySearch;
    $scope.data = [];
    $scope.transformChip = transformChip;
    $scope.selectedSkills = [];
    //search functionality for searching the skill

    function transformChip(chip) {
      return {
        name: chip
      };
    }

    if ($scope.chickletData.tech_skills_used) {
      if ($scope.chickletData.tech_skills_used.value) {
        console.log($scope.chickletData.tech_skills_used.value);
        $scope.chickletData.tech_skills_used.value.split(",").forEach(function(skill) {
          console.log(skill);
          if ($scope.selectedSkills.indexOf(skill) < 0) $scope.selectedSkills.push({
            name: skill
          });
        });
      }
      $scope.$watchCollection('selectedSkills', function(nv) {
        var value = "";
        nv.forEach(function(item, index, arr) {
          console.log(index, arr.length);
          if (index == arr.length - 1) {
            value += item.name;
          } else {
            value += item.name + ",";
          }
        });
        $scope.chickletData.tech_skills_used.value = value;
      });
    }
    //search functionality for searching the skills
    function querySearch(criteria) {
      cachedQuery = cachedQuery || criteria;
      return profile.getSkillByTypedString(criteria).then(function(skills) {
        $scope.data = [];
        skills.data.forEach(function(item, index) {
          console.log(item.skills);
          $scope.data.push(item.skills);
        });
        return $scope.data;
      });
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
      };
    }
  }]);
