angular.module('portfolio')
  .service('chicklets', function($http) {
    this.getData = function() {
      return $http.get('/chicklets/default');
    }
  })
