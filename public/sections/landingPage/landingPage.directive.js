angular.module('portfolio')
  .directive('landingPage',function() {
  return {
      templateUrl: '/sections/landingPage/landingPage.html',
      scope: {
      },
      controller: 'landingPageCtrl'
  }
});
