angular.module('portfolio')
  .directive('aboutMe', function() {
    return {
      templateUrl: '../js/directives/aboutMe/aboutSection/aboutMe.boot.tmpl.html',
      scope: {
        sectionName: '@',
        displayName:'@'
      },
      transclude: {
        'profile-a': '?profileA',
        'contact-c': '?contactC',
        'other-b': '?otherB',
        'summary-d': '?summaryD'
      },
      controller: function($rootScope,$scope) {

        // console.log($rootScope["placeholder-a"]);
        console.log($scope.profiles);
      }
    }
  });
