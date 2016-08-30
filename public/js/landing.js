angular.module('portfolio')
 .config(function($routeProvider) {
$routeProvider
  // .when('/',{
  //
  // })
  .when('/',{
    template:'<landing-page></landing-page>'
    // templateUrl:'./index1.html',
    // controller:'mainCtrl'
  })
  .when('/buttonclick2',{
    templateUrl:'./index1.html',
    controller:'mainCtrl'
  })

 });
