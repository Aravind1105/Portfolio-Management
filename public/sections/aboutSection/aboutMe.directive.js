angular.module('portfolio')
  .directive('aboutMe', function() {
    return {
      templateUrl: 'sections/aboutSection/aboutMe.tmpl.html',
      scope: {
        sectionName: '@',
        displayName: '@'
      },
      transclude: {
        'profile-a': '?profileA',
        'contact-c': '?contactC',
        'other-b': '?otherB',
        'summary-d': '?summaryD'
      },
      controller: function($rootScope, $scope) {}
    }
  });
