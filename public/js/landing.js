angular.module('portfolio')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        templateUrl: './index1.html',
        controller: 'mainCtrl'
      });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
