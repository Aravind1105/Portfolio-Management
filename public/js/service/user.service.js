angular.module('portfolio')
  .service('profile', function($http) {
    this.getData = function(profileId) {
      return $http.get("/" + profileId + "/getdata");
    }
    this.getSkillByTypedString = function(str) {
      console.log("inside the service of  getUserByTypedString" + str);
      return $http.get('/skills/' + str);
    }

    this.postSkills = function(skills, userId) {
      var user = {
        "skills": skills,
        "id": userId
      }
      console.log("got user skills and details");
      return $http.post('/updateSkills', user);
    }
  })
