angular.module('portfolio')
  .directive('landingPage',function() {
  return {
      templateUrl: '../js/directives/landingPage/landingPage.html',
      scope: {
      },
      controller: 'landingPageCtrl'
  }
});
