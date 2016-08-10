angular.module('portfolio')
  .service('profile', function($http) {
    this.getData = function() {
      return $http.get('http://localhost:3000/profiles')
    }
  })
