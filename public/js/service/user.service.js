angular.module('portfolio')
  .service('profile', function($http) {
    this.getData = function(profileId) {
      return $http.get("/"+profileId+"/getdata");
    }
  })
