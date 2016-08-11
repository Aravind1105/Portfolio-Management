angular.module('portfolio')
    .service('page', ["$http", function ($http) {
        this.getData = function () {
            return $http.get("http://localhost:3000/page/11");
        }
    }]);
