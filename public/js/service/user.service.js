angular.module('portfolio')
  .service('profile', function($http) {
    this.getData = function() {
        return $http.get('/profile/uma/default');
    }
  })
