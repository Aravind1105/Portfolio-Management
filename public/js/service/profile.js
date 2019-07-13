angular.module('portfolio')
  .service('page', ["$http", function($http) {
    this.getData = function(profileId) {
      return $http.get('/' + profileId + '/getdata');
    }
  }]);
