angular.module('portfolio')
 .config(function($routeProvider) {
$routeProvider
  .when('/:username',{
    templateUrl : './index1.html',
    controller  : 'mainCtrl'
  })

 });
