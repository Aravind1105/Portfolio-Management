angular.module('portfolio')
 .config(function($routeProvider) {
$routeProvider
  .when('/',{
    template:'<landing-page></landing-page>'
  })
   .when('/buttonclick', {
       templateUrl : 'index.html',
       controller  : 'mainCtrl'
   })
 });
