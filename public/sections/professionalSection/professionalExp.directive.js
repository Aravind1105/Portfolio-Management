angular.module('portfolio')
  .directive('professionalExp', function() {
    return {
      templateUrl: 'sections/professionalSection/professionalExp.tmpl.html',
      scope: {
        sectionName: '@',
        displayName: '@'
      },
      transclude: {
        'placeholder-r': '?placeholderR',
        'placeholder-s': '?placeholderS',
      },
      controller: function($rootScope, $scope) {}
    }
  });
