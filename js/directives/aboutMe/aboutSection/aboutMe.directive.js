angular.module('portfolio')
  .directive('aboutMe', function() {
    return {
      templateUrl: '../js/directives/aboutMe/aboutSection/aboutMe.tmpl.html',
      scope: {
        sectionName: '@'
      },
      transclude: {
        'profile-a': '?profileA',
        'contact-b': '?contactB',
        'other-c': '?otherC',
        'summary-d': '?summaryD'
      },
      controller: function($rootScope,$scope) {
        // console.log($rootScope["placeholder-a"]);
        // console.log($scope.sectionName);
      }
    }
  });
