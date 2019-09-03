angular.module('portfolio')
  .directive('skillSection', function() {
    return {
      templateUrl: 'sections/skillSection/skillsection.tmpl.html',
      scope: {
        sectionName: '@',
        displayName: '@'
      },
      transclude: {
        'placeholder-skilla': '?placeholderSkilla'
      },
      controller: function($rootScope, $scope) {}
    }
  });
