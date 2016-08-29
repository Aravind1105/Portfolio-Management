angular.module('portfolio')
    .service('page', ["$http", function ($http) {
      this.getData = function() {
        return $http.get('/:username/getdata');
        }
    }]);
